(function() {
    'use strict';

    angular.module("taskdo.tasks").controller("TaskController", TaskController);

    TaskController.$inject = ['$scope', '$state', '$ionicPopover', '$ionicModal',
        '$timeout', 'LIST_FIELDS', 'STATE', 'i18nService', 'toastService',
        'popupService', 'taskService', 'projectService', 'ionicMaterialInk',
        'defaultProject', 'utilService', 'DATE_FILTER'];

    function TaskController($scope, $state, $ionicPopover, $ionicModal,
        $timeout, LIST_FIELDS, STATE, i18n, toastService, popupService,
        taskService, projectService, ionicMaterialInk, defaultProject,
        utilService, DATE_FILTER) {

        var mv = this;
        var _lastFinished = null;
        var _partialsPath = "app/tasks/partials/";

        var _startDate = null;
        var _endDate = null;
        var _projectId = null;
        var _popover = null;
        var _modalForm = null;

        mv.isStateFinished = function() {
            return $state.is(STATE.TASKS.FINISHED);
        };

        mv.goStateFinished = function() {
            mv.closeMoreActions();
            $state.go(STATE.TASKS.FINISHED, {project_id: _projectId});
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

                if (_projectId != null) {
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
        }

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
            taskService.listByProject(_projectId, _startDate, _endDate)
                .then(function(tasks) {
                    mv.tasks = tasks;

                    $timeout(function() {
                        ionicMaterialInk.displayEffect();
                    }, 300);
                })
                .catch(function(error) {
                    mv.tasks = [];
                    console.error(error);
                });
        };

        mv.refreshProjects = function() {
            projectService.listAll()
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
                        mv.hideForm().then(function() {
                            if (mv.task.hasOwnProperty("_id")) {
                                toastService.show(i18n.common.messages.success.updated);
                            } else {
                                toastService.show(i18n.common.messages.success.created);
                            }

                            mv.unselectAll();
                            mv.refreshList();
                        });
                    })
                    .catch(function(error) {
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
                        mv.unselectAll();
                        toastService.show(i18n.common.messages.success.removedSelected);
                        mv.refreshList();
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
                        mv.unselectAll();
                        toastService.show(i18n.tasks.messages.success.finished);
                        mv.refreshList();
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

        $scope.$on("$ionicView.beforeEnter", function(event, data) {
            var project = $state.params.project;
            var dateFilter = $state.params.dateFilter;

            if (project) {
                _projectId = $state.params.project._id;
                mv.pageTitle = $state.params.project.name;
            } else if (dateFilter) {
                if (dateFilter == DATE_FILTER.WEEK) {
                    var weekRange = utilService.getWeekRangeOfDate(new Date());
                    _startDate = weekRange.start;
                    _endDate = weekRange.end;

                    mv.pageTitle = i18n.tasks.list.week;
                } else {
                    _endDate = new Date();
                    mv.pageTitle = i18n.tasks.list.today;
                }
            } else {
                mv.pageTitle = i18n.tasks.list.all;
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
            mv.defaultProject = defaultProject;

            $ionicPopover.fromTemplateUrl(_partialsPath + 'task-more-actions.html', {
                scope: $scope
            }).then(function(popover) {
                _popover = popover;
            });

            $ionicModal.fromTemplateUrl(_partialsPath + 'task-form.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                _modalForm = modal;
            });
        })();

    }

})();
