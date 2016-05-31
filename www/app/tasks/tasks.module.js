(function() {
    'use strict';

    angular.module("taskdo.tasks", ['taskdo.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider
            .state(STATE.TASKS.OPENED, {
                url: "/tasks",
                params: {
                    project: null,
                    dateFilter: null
                },
                views: {
                    'content-menu': {
                        templateUrl: "app/tasks/partials/task-list.html",
                        controller: "TaskController",
                        controllerAs: "mv"
                    }
                }
            })
            .state(STATE.TASKS.FINISHED, {
                url: "/tasks-finished",
                params: {
                    project_id: null
                },
                views: {
                    'content-menu': {
                        templateUrl: "app/tasks/partials/task-finished.html",
                        controller: "TaskFinishedController",
                        controllerAs: "mv"
                    }
                }
            });
    }

})();
