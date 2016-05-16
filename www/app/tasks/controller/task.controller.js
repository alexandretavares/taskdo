(function() {
    'use strict';

    angular.module("todolist.tasks").controller("TaskController", TaskController);
    TaskController.$inject = ['$scope', '$state', '$ionicHistory', '$ionicPopover', 'STATE',
        'i18nService', 'toastService', 'popupService', 'taskService', 'projectService'];

    function TaskController($scope, $state, $ionicHistory, $ionicPopover, STATE, i18n,
        toastService, popupService, taskService, projectService) {

        var mv = this;
        var _popover = null;

        var _initPopover = function() {
            if (_popover == null) {
                $ionicPopover.fromTemplateUrl('app/tasks/partials/task-more-actions.html', {
                    scope: $scope
                }).then(function(popover) {
                    _popover = popover;
                });
            }
        };

        mv.goBack = function() {
            $ionicHistory.goBack();
        };

        mv.refreshList = function() {
            taskService.list()
                .then(function(tasks) {
                    mv.tasks = tasks;
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

        mv.isEditMode = function() {
            return $state.is(mv.editMode);
        };

        mv.isListMode = function() {
            return $state.is(mv.listMode);
        };

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        mv.isInvalidForm = function() {
            if (mv.isEditMode()) {
                return mv.taskForm.$invalid;
            } else {
                return mv.taskForm.$invalid || mv.taskForm.$pristine;
            }
        };

        mv.hasSelected = function() {
            return !angular.equals({}, mv.selected);
        };

        mv.checkSelected = function(id) {
            if (!mv.selected[id]) {
                delete mv.selected[id];
            }

            if (!mv.hasSelected() && mv.selectedAll) {
                mv.selectedAll = false;
            }
        };

        mv.selectAll = function() {
            mv.selectedAll = !mv.selectedAll;

            if (mv.selectedAll) {
                for (var i = 0; i < mv.tasks.length; i++) {
                    mv.selected[mv.tasks[i]._id] = true;
                }
            } else {
                mv.selected = {};
            }

            _popover.hide();
        };

        mv.save = function() {
            taskService.save(mv.task)
                .then(function() {
                    if ($state.params.id) {
                        toastService.show(i18n.common.messages.success.updated);
                    } else {
                        toastService.show(i18n.common.messages.success.created);
                    }

                    $state.go(mv.listMode).then(function() {
                        mv.refreshList();
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        mv.remove = function() {
            popupService.remove().then(function() {
                taskService.remove($state.params.id)
                    .then(function() {
                        toastService.show(i18n.common.messages.success.removed);

                        $state.go(mv.listMode).then(function() {
                            mv.refreshList();
                        });
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            });
        };

        mv.removeSelected = function() {
            popupService.remove().then(function() {
                var tasksToRemove = [];

                angular.forEach(mv.selected, function(value, key) {
                    tasksToRemove.push(key);
                });

                taskService.remove(tasksToRemove)
                    .then(function() {
                        mv.selected = {};
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
                        mv.selected = {};
                        toastService.show(i18n.tasks.messages.success.finished);
                        mv.refreshList();
                    });
            });
        };

        $scope.$on("$ionicView.beforeEnter", function() {
            if (!$state.is(mv.listMode)) {
                mv.task = {};
                mv.minDate = new Date();
                mv.taskForm.$setPristine();

                if ($state.params.id) {
                    taskService.get($state.params.id)
                        .then(function(task) {
                            mv.task = task;

                            if (mv.task.hasOwnProperty("dueDate")) {
                                mv.task.dueDate = new Date(task.dueDate);
                            }
                        });
                }
            }
        });

        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams, options) {
                if (fromState.name != "" && fromState.name.indexOf(STATE.TASKS.BASE) == -1) {
                    mv.refreshList();
                    mv.refreshProjects();
                }
            }
        );

        $scope.$on('$destroy', function() {
            _popover.remove();
        });

        (function() {
            mv.projects = [];
            mv.tasks = [];
            mv.task = {};
            mv.selected = {};
            mv.selectedAll = false;
            mv.newMode = STATE.TASKS.NEW;
            mv.editMode = STATE.TASKS.EDIT;
            mv.listMode = STATE.TASKS.LIST;
            mv.showMode = STATE.TASKS.SHOW;

            _initPopover();
            mv.refreshList();
            mv.refreshProjects();
        })();
    }

})();
