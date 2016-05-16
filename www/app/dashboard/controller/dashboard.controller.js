(function() {
    'use strict';

    angular.module("todolist.dashboard").controller("DashboardController", DashboardController);
    DashboardController.$inject = ['$scope', 'dashboardService'];

    function DashboardController($scope, dashboardService) {
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
        })();
    }

})();
