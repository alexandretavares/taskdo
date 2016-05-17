(function() {
    'use strict';

    angular.module("taskdo.dashboard").service("dashboardService", dashboardService);
    dashboardService.$inject = ['taskService'];

    function dashboardService(taskService) {

        this.listIncompleteTasks = function() {
            return taskService.listIncompleteTasks();
        };

    }

})();
