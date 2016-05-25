(function() {
    'use strict';

    angular.module("taskdo.tasks").controller("TaskController", TaskController);

    TaskController.$inject = ['$scope', '$ionicPopover', '$ionicModal', 'CRUD_FIELDS',
        'i18nService', 'toastService', 'popupService', 'taskService', 'projectService'];

    function TaskController($scope, $ionicPopover, $ionicModal, CRUD_FIELDS,
        i18n, toastService, popupService, taskService, projectService) {

        var mv = this;
        var _popover = null;
        var _modal = null;

        var _initPopover = function() {
            if (_popover == null) {
                $ionicPopover.fromTemplateUrl('app/tasks/partials/task-more-actions.html', {
                    scope: $scope
                }).then(function(popover) {
                    _popover = popover;
                });
            }
        };

        var _initModal = function() {
            $ionicModal.fromTemplateUrl('app/tasks/partials/task-form.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                _modal = modal;
            });
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

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        mv.closeMoreActions = function() {
            _popover.hide();
        };

        mv.showForm = function(edit) {
            mv.minDate = new Date();

            if (edit && mv.hasOnlySelected()) {
                mv.editMode = true;

                var firstKey = Object.keys(mv.selected)[0];
                mv.task = angular.copy(mv.selected[firstKey]);

                if (mv.task.hasOwnProperty("dueDate")) {
                    mv.task.dueDate = new Date(mv.task.dueDate);
                }
            } else {
                mv.editMode = false;
                mv.task = {};
            }

            _modal.show();
        };

        mv.hideForm = function() {
            mv.task = {};
            _modal.hide();
        };

        mv.hasOnlySelected = function() {
            return (!angular.equals({}, mv.selected) && mv.selectedCount == 1);
        }

        mv.hasSelected = function() {
            return !angular.equals({}, mv.selected);
        };

        mv.selectAll = function() {
            if (mv.tasks.length > 0) {
                mv.selectedAll = !mv.selectedAll;

                if (mv.selectedAll) {
                    for (var i = 0; i < mv.tasks.length; i++) {
                        mv.selected[mv.tasks[i]._id] = mv.tasks[i];
                        mv.selectedCount++;
                    }
                } else {
                    mv.unselectAll();
                }

                mv.closeMoreActions();
            }
        };

        mv.unselectAll = function() {
            mv.selected = {};
            mv.selectedAll = false;
            mv.selectedCount = 0;
        };

        mv.save = function() {
            if (mv.taskForm.$invalid) {
                toastService.show(i18n.common.validations.requiredFields);
            } else {
                taskService.save(mv.task)
                    .then(function() {
                        if (mv.task.hasOwnProperty("_id")) {
                            toastService.show(i18n.common.messages.success.updated);

                        } else {
                            toastService.show(i18n.common.messages.success.created);
                        }

                        mv.unselectAll();
                        mv.refreshList();
                        mv.hideForm();
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
                        mv.selected = {};
                        toastService.show(i18n.tasks.messages.success.finished);
                        mv.refreshList();
                    });
            });
        };

        $scope.$on("$ionicView.beforeEnter", function(event, data) {
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
            mv.fields = CRUD_FIELDS.TASKS;

            _initPopover();
            _initModal();
        })();
    }

})();
