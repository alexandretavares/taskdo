(function() {
    'use strict';

    angular.module("taskdo.about", ['taskdo.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider
            .state(STATE.ABOUT, {
                url: "/about",
                views: {
                    'content-menu': {
                        templateUrl: "app/about/partials/about.html"
                    }
                }
            });
    }
})();
