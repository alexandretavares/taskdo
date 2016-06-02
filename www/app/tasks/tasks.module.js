(function() {
    'use strict';

    angular.module("taskdo.tasks", ['taskdo.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider
            .state(STATE.TASKS.BASE, {
                url: "/tasks",
                abstract: true,
                views: {
                    'content-menu': {
                        template: '<ion-nav-view name="content-view"></ion-nav-view>',
                        controller: "TaskController",
                        controllerAs: "mv"
                    }
                }
            })
            .state(STATE.TASKS.ALL, {
                url: "/all",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-list.html"
                    }
                }
            })
            .state(STATE.TASKS.INBOX, {
                url: "/inbox",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-list.html"
                    }
                }
            })
            .state(STATE.TASKS.TODAY, {
                url: "/today",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-list.html"
                    }
                }
            })
            .state(STATE.TASKS.WEEK, {
                url: "/week",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-list.html"
                    }
                }
            })
            .state(STATE.TASKS.BY_PROJECT, {
                url: "/by-project",
                params: {
                    project: null
                },
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-list.html"
                    }
                }
            })
            .state(STATE.TASKS.FINISHED, {
                url: "/tasks/finished",
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
