(function() {
    'use strict';

    angular.module("todolist.dashboard").service("dashboardService", dashboardService);
    dashboardService.$inject = ['taskService'];

    function dashboardService(taskService) {

        this.listIncompleteTasks = function() {
            return taskService.listIncompleteTasks();
        };

    }

})();
