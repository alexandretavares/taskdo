(function() {
    'use strict';

    angular.module("taskdo.common", []).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider.state(STATE.BASE, {
            url: '/app',
            abstract: true,
            templateUrl: 'app/common/partials/menu.html',
            controller: 'MenuController',
            controllerAs: 'mv'
        });
    }

})();
