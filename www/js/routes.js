// Routes
angular.module('todolist').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/miscellaneous/partials/menu.html'
        })
        .state("app.dashboard", {
            url: "/dashboard",
            views: {
              'content-menu': {
                templateUrl: "app/miscellaneous/partials/dashboard.html"
              }
            }
        })
        .state("app.projects", {
            url: "/projects",
            views: {
              'content-menu': {
                templateUrl: "app/projects/partials/list.html",
                controller: "ProjectController"
              }
            }
        });

    $urlRouterProvider.otherwise("/app/dashboard");
});
