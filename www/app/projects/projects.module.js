(function() {
    'use strict';

    angular.module("todolist.projects", ['todolist.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider
            .state(STATE.PROJECTS.BASE, {
                url: "/projects",
                abstract: true,
                views: {
                    'content-menu': {
                        template: '<ion-nav-view name="content-view"></ion-nav-view>',
                        controller: "ProjectController",
                        controllerAs: "mv"
                    }
                }
            })
            .state(STATE.PROJECTS.LIST, {
                url: "/list",
                views: {
                    'content-view': {
                        templateUrl: "app/projects/partials/project-list.html"
                    }
                }
            })
            .state(STATE.PROJECTS.NEW, {
                url: "/new",
                views: {
                    'content-view': {
                        templateUrl: "app/projects/partials/project-form.html"
                    }
                }
            })
            .state(STATE.PROJECTS.EDIT, {
                url: "/edit/:id",
                views: {
                    'content-view': {
                        templateUrl: "app/projects/partials/project-form.html"
                    }
                }
            });
    }

})();
