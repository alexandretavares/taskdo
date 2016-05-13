(function() {
    'use strict';

    angular.module("todolist.dashboard", ['todolist.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider
            .state(STATE.DASHBOARD, {
                url: "/dashboard",
                views: {
                    'content-menu': {
                        templateUrl: "app/dashboard/partials/dashboard.html",
                        controller: "DashboardController",
                        controllerAs: "mv"
                    }
                }
            });
    }

})();
