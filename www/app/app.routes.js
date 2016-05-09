(function() {
    'use strict';

    angular.module('todolist').config(function(APP_STATE, $stateProvider, $urlRouterProvider) {
        $stateProvider
        .state(APP_STATE.BASE, {
            url: '/app',
            abstract: true,
            templateUrl: 'app/miscellaneous/partials/menu.html'
        })
        .state(APP_STATE.DASHBOARD, {
            url: "/dashboard",
            views: {
                'content-menu': {
                    templateUrl: "app/miscellaneous/partials/dashboard.html"
                }
            }
        })
        .state(APP_STATE.PROJECTS.LIST, {
            url: "/projects",
            views: {
                'content-menu': {
                    templateUrl: "app/projects/partials/project-list.html",
                    controller: "ProjectController as mv"
                }
            }
        })
        .state(APP_STATE.PROJECTS.NEW, {
            url: "/projects/new",
            views: {
                'content-menu': {
                    templateUrl: "app/projects/partials/project-form.html",
                    controller: "ProjectController as mv"
                }
            }
        })
        .state(APP_STATE.PROJECTS.EDIT, {
            url: "/projects/edit/:id",
            views: {
                'content-menu': {
                    templateUrl: "app/projects/partials/project-form.html",
                    controller: "ProjectController as mv"
                }
            }
        });

        $urlRouterProvider.otherwise("/app/dashboard");
    });

})();
