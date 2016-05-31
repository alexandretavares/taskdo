(function() {
    'use strict';

    angular.module("taskdo.dashboard").controller("DashboardController", DashboardController);
    DashboardController.$inject = ['$scope', 'dashboardService', 'LIST_FIELDS',
        '$timeout', 'ionicMaterialInk'];

    function DashboardController($scope, dashboardService, LIST_FIELDS,
        $timeout, ionicMaterialInk) {

        var mv = this;
        var _indexedTasks = [];

        mv.tasksToFilter = function() {
            _indexedTasks = [];
            return mv.tasks;
        };

        mv.filterTasks = function(task) {
            var isNewTask = _indexedTasks.indexOf(task.dueDate) == -1;

            if (isNewTask) {
                _indexedTasks.push(task.dueDate);
            }

            return isNewTask;
        };

        $scope.$on("$ionicView.beforeEnter", function() {
            _indexedTasks = [];

            dashboardService.listOpenedTasks().then(function(tasks) {
                mv.tasks = tasks;

                $timeout(function() {
                    ionicMaterialInk.displayEffect();
                }, 300);
            });
        });

        (function() {
            mv.tasks = [];
            mv.selected = {};
            mv.selectedCount = 0;
            mv.selectedAll = false;
            mv.fields = LIST_FIELDS.DASHBOARD;
        })();
    }

})();
