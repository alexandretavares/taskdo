(function() {
    'use strict';

    angular.module("taskdo.tasks").controller("TaskController", TaskController);

    TaskController.$inject = ['$scope', '$state', '$ionicPopover', '$ionicModal',
        'LIST_FIELDS', 'STATE', 'i18nService', 'toastService', 'popupService',
        'taskService', 'projectService', 'defaultProject', 'utilService', '$ionicLoading'];

    function TaskController($scope, $state, $ionicPopover, $ionicModal,
        LIST_FIELDS, STATE, i18n, toastService, popupService, taskService,
        projectService, defaultProject, utilService, $ionicLoading) {

        var mv = this;
        var DEFAULT_ICON = "tasks";
        var PARTIALS_PATH = "app/tasks/partials/";

        var _lastFinished = null;
        var _projectId = null;
        var _startDate = null;
        var _endDate = null;
        var _popover = null;
        var _modalForm = null;

        mv.isStateFinished = function() {
            return $state.is(STATE.TASKS.FINISHED);
        };

        mv.goStateFinished = function() {
            mv.closeMoreActions();

            $state.go(STATE.TASKS.FINISHED, {
                project_id: _projectId,
                start: _startDate,
                end: _endDate
            });
        };

        mv.goBack = function() {
            $state.go(STATE.PROJECTS);
        };

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        mv.closeMoreActions = function() {
            _popover.hide();
        };

        mv.showForm = function(edit) {
            mv.minDate = new Date();

            if (edit) {
                mv.editMode = true;

                var firstKey = Object.keys(mv.selected)[0];
                mv.task = angular.copy(mv.selected[firstKey]);
            } else {
                mv.task = {};
                mv.editMode = false;

                if (_projectId !== null) {
                    mv.task.project_id = _projectId;
                }
            }

            _modalForm.show();
        };

        mv.hideForm = function() {
            mv.task = {};

            return _modalForm.hide();
        };

        mv.hasOnlySelected = function() {
            return (!angular.equals({}, mv.selected) && mv.selectedCount == 1);
        };

        mv.hasSelected = function() {
            return !angular.equals({}, mv.selected);
        };

        mv.toggleSelectAll = function() {
            mv.selectedAll = !mv.selectedAll;
            mv.closeMoreActions();
        };

        mv.unselectAll = function() {
            mv.selected = {};
            mv.selectedAll = false;
            mv.selectedCount = 0;
        };

        mv.refreshList = function() {
            $ionicLoading.show();

            taskService.listOpened(_projectId, _startDate, _endDate)
                .then(function(tasks) {
                    mv.tasks = tasks;
                })
                .catch(function(error) {
                    mv.tasks = [];
                    console.error(error);
                })
                .finally(function() {
                    $ionicLoading.hide().then(function() {
                        if (mv.tasks.length === 0) {
                            mv.isEmpty = true;
                        } else {
                            mv.isEmpty = false;
                        }
                    });
                });
        };

        mv.refreshProjects = function() {
            projectService.list()
                .then(function(projects) {
                    mv.projects = projects;
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        mv.save = function() {
            if (mv.taskForm.$invalid) {
                toastService.show(i18n.common.validations.requiredFields);
            } else {
                taskService.save(mv.task)
                    .then(function() {
                        var message;

                        if (mv.task.hasOwnProperty("_id")) {
                            message = i18n.common.messages.success.updated;
                        } else {
                            message = i18n.common.messages.success.created;
                        }

                        toastService.show(message).then(function() {
                            mv.unselectAll();
                            mv.refreshList();
                            mv.hideForm();
                        });
                    })
                    .catch(function(error) {
                        toastService.show(i18n.common.messages.error.duplicated);
                        console.error(error);
                    });
            }
        };

        mv.remove = function() {
            popupService.remove().then(function() {
                var tasksToRemove = [];

                angular.forEach(mv.selected, function(value, key) {
                    tasksToRemove.push(key);
                });

                taskService.remove(tasksToRemove)
                    .then(function() {
                        toastService.show(i18n.common.messages.success.removedSelected)
                            .then(function() {
                                mv.unselectAll();
                                mv.refreshList();
                            });
                    });
            });
        };

        mv.finish = function() {
            popupService.finish().then(function() {
                var tasksToFinish = [];

                angular.forEach(mv.selected, function(value, key) {
                    tasksToFinish.push(key);
                });

                taskService.finish(tasksToFinish)
                    .then(function() {
                        toastService.show(i18n.tasks.messages.success.finished)
                            .then(function() {
                                mv.unselectAll();
                                mv.refreshList();
                            });
                    });
            });
        };

        mv.onDragRightComplete = function(id) {
            taskService.finish(id)
                .then(function() {
                    _lastFinished = id;
                    mv.snackbarVisible = true;
                    mv.unselectAll();
                    mv.refreshList();
                });
        };

        mv.undoFinish = function() {
            taskService.restore(_lastFinished)
                .then(function() {
                    _lastFinished = null;
                    mv.unselectAll();
                    mv.refreshList();
                });
        };

        mv.canShowFinished = function() {
            return !$state.is(STATE.TASKS.TODAY) && !$state.is(STATE.TASKS.WEEK);
        };

        $scope.$on("$ionicView.beforeEnter", function(event, data) {
            _projectId = null;
            _startDate = null;
            _endDate = null;

            switch ($state.current.name) {
                case STATE.TASKS.INBOX:
                    _projectId = defaultProject._id;
                    mv.pageTitle = defaultProject.name;
                    mv.emptyPageIcon = "inbox";
                    break;
                case STATE.TASKS.TODAY:
                    _endDate = new Date();
                    mv.pageTitle = "i18n.tasks.list.today";
                    mv.emptyPageIcon = "today";
                    break;
                case STATE.TASKS.WEEK:
                    var weekRange = utilService.getWeekRangeOfDate(new Date());
                    _startDate = weekRange.start;
                    _endDate = weekRange.end;

                    mv.pageTitle = "i18n.tasks.list.week";
                    mv.emptyPageIcon = "week";
                    break;
                case STATE.TASKS.BY_PROJECT:
                    var project = $state.params.project;
                    mv.emptyPageIcon = DEFAULT_ICON;

                    if (project) {
                        _projectId = project._id;
                        mv.pageTitle = project.name;
                    }

                    break;
                default:
                    mv.emptyPageIcon = DEFAULT_ICON;
                    mv.pageTitle = "i18n.tasks.list.all";
            }

            mv.refreshList();
            mv.refreshProjects();
        });

        $scope.$on('$destroy', function() {
            _popover.remove();
        });

        (function() {
            mv.projects = [];
            mv.tasks = [];
            mv.task = {};
            mv.selected = {};
            mv.pageTitle = "";
            mv.editMode = false;
            mv.selectedCount = 0;
            mv.selectedAll = false;
            mv.snackbarVisible = false;
            mv.stateFinished = STATE.TASKS.FINISHED;
            mv.fields = LIST_FIELDS.TASKS;
            mv.emptyPageIcon = DEFAULT_ICON;
            mv.isEmpty = false;

            $ionicPopover.fromTemplateUrl(PARTIALS_PATH + 'task-more-actions.html', {
                scope: $scope
            }).then(function(popover) {
                _popover = popover;
            });

            $ionicModal.fromTemplateUrl(PARTIALS_PATH + 'task-form.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                _modalForm = modal;
            });
        })();

    }

})();
