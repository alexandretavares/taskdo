(function() {
    'use strict';

    angular.module("taskdo.dashboard").service("dashboardService", dashboardService);
    dashboardService.$inject = ['taskService'];

    function dashboardService(taskService) {

        this.listOpenedTasks = function() {
            return taskService.listOpened();
        };

    }

})();
