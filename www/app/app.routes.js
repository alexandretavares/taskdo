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
        .state(APP_STATE.PROJECTS.BASE, {
            url: "/projects",
            abstract: true,
            views: {
                'content-menu': {
                    template: '<ion-nav-view name="project-view"></ion-nav-view>',
                    controller: "ProjectController as mv"
                }
            }
        })
        .state(APP_STATE.PROJECTS.LIST, {
            url: "/list",
            params: {
                refresh: false
            },
            views: {
                'project-view': {
                    templateUrl: "app/projects/partials/project-list.html"
                }
            }
        })
        .state(APP_STATE.PROJECTS.NEW, {
            url: "/new",
            views: {
                'project-view': {
                    templateUrl: "app/projects/partials/project-form.html"
                }
            }
        })
        .state(APP_STATE.PROJECTS.EDIT, {
            url: "/edit/:id",
            views: {
                'project-view': {
                    templateUrl: "app/projects/partials/project-form.html"
                }
            }
        });

        //$urlRouterProvider.otherwise("/app/dashboard");
        $urlRouterProvider.otherwise("/app/projects/list");
    });

})();
