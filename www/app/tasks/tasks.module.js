(function() {
    'use strict';

    angular.module("todolist.tasks", ['todolist.common']).config(config);
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
            .state(STATE.TASKS.LIST, {
                url: "/list",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-list.html"
                    }
                }
            })
            .state(STATE.TASKS.NEW, {
                url: "/new",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-form.html"
                    }
                }
            })
            .state(STATE.TASKS.EDIT, {
                url: "/edit/:id",
                views: {
                    'content-view': {
                        templateUrl: "app/tasks/partials/task-form.html"
                    }
                }
            });
    }

})();
