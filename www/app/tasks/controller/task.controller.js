(function() {
    'use strict';

    angular.module("taskdo.tasks").controller("TaskController", TaskController);

    TaskController.$inject = ['$scope', '$state', '$ionicPopover', '$ionicModal', '$timeout',
        'CRUD_FIELDS', 'STATE', 'i18nService', 'toastService', 'popupService',
        'taskService', 'projectService', 'ionicMaterialInk'];

    function TaskController($scope, $state, $ionicPopover, $ionicModal, $timeout,
        CRUD_FIELDS, STATE, i18n, toastService, popupService,
        taskService, projectService, ionicMaterialInk) {

        var mv = this;
        var _lastFinished = null;
        var _partialsPath = "app/tasks/partials/";

        var _popover = null;
        var _modalForm = null;
        var _modalOptions = { scope: $scope, animation: 'slide-in-up' };

        mv.isStateFinished = function() {
            return $state.is(STATE.TASKS.FINISHED);
        };

        mv.goStateFinished = function() {
            mv.closeMoreActions();
            $state.go(STATE.TASKS.FINISHED);
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

                if (mv.task.hasOwnProperty("dueDate")) {
                    mv.task.dueDate = new Date(mv.task.dueDate);
                }
            } else {
                mv.task = {};
                mv.editMode = false;
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
            taskService.listOpened()
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
            mv.minDate = new Date();
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
            mv.selectedCount = 0;
            mv.selectedAll = false;
            mv.editMode = false;
            mv.snackbarVisible = false;
            mv.fields = CRUD_FIELDS.TASKS;
            mv.stateFinished = STATE.TASKS.FINISHED;

            $ionicPopover.fromTemplateUrl(_partialsPath + 'task-more-actions.html', {
                scope: $scope
            }).then(function(popover) {
                _popover = popover;
            });

            $ionicModal.fromTemplateUrl(_partialsPath + 'task-form.html', _modalOptions)
                .then(function(modal) {
                    _modalForm = modal;
                });

        })();

    }

})();
