(function() {
    'use strict';

    angular.module("taskdo.dashboard").controller("DashboardController", DashboardController);
    DashboardController.$inject = ['$scope', 'dashboardService', 'CRUD_FIELDS'];

    function DashboardController($scope, dashboardService, CRUD_FIELDS) {
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

            dashboardService.listIncompleteTasks().then(function(tasks) {
                mv.tasks = tasks;
            });
        });

        (function() {
            mv.tasks = [];
            mv.selected = {};
            mv.selectedCount = 0;
            mv.selectedAll = false;
            mv.fields = CRUD_FIELDS.DASHBOARD;
        })();
    }

})();
