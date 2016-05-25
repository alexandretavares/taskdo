(function() {
    'use strict';

    angular.module("taskdo.tasks", ['taskdo.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider.state(STATE.TASKS, {
            url: "/tasks/list",
            views: {
                'content-menu': {
                    templateUrl: "app/tasks/partials/task-list.html",
                    controller: "TaskController",
                    controllerAs: "mv"
                }
            }
        });
    }

})();
