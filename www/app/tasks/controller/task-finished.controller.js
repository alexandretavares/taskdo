(function() {
    'use strict';

    angular.module("taskdo.tasks").controller("TaskFinishedController", TaskFinishedController);

    TaskFinishedController.$inject = ['$scope', '$state', '$ionicHistory', '$ionicPopover',
        'STATE', 'LIST_FIELDS', 'i18nService', 'toastService', 'popupService',
        'taskService', '$ionicLoading'];

    function TaskFinishedController($scope, $state, $ionicHistory, $ionicPopover,
        STATE, LIST_FIELDS, i18n, toastService, popupService, taskService, $ionicLoading) {

        var mv = this;
        var _projectId = null;
        var _popover = null;
        var _partialsPath = "app/tasks/partials/";

        mv.goBack = function() {
            $ionicHistory.goBack();
        };

        mv.isStateFinished = function() {
            return $state.is(STATE.TASKS.FINISHED);
        };

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        mv.closeMoreActions = function() {
            _popover.hide();
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

            taskService.listFinished(_projectId)
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

        mv.restore = function() {
            popupService.restore().then(function() {
                var tasksToRestore = [];

                angular.forEach(mv.selected, function(value, key) {
                    tasksToRestore.push(key);
                });

                taskService.restore(tasksToRestore)
                    .then(function() {
                        mv.unselectAll();
                        toastService.show(i18n.tasks.messages.success.restored);
                        mv.refreshList();
                    });
            });
        };

        $scope.$on("$ionicView.beforeEnter", function(event, data) {
            _projectId = $state.params.project_id;
            mv.refreshList();
        });

        $scope.$on('$destroy', function() {
            _popover.remove();
        });

        (function() {
            mv.tasks = [];
            mv.selected = {};
            mv.selectedCount = 0;
            mv.selectedAll = false;
            mv.fields = LIST_FIELDS.TASKS;
            mv.stateFinished = STATE.TASKS.FINISHED;

            $ionicPopover.fromTemplateUrl(_partialsPath + 'task-more-actions.html', {
                scope: $scope
            }).then(function(popover) {
                _popover = popover;
            });

        })();

    }

})();
