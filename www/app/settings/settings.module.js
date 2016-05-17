(function() {
    'use strict';

    angular.module("taskdo.settings", ['taskdo.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider
            .state(STATE.SETTINGS, {
                url: "/settings",
                views: {
                    'content-menu': {
                        templateUrl: "app/settings/partials/setting-form.html",
                        controller: "SettingController",
                        controllerAs: "mv"
                    }
                }
            });
    }

})();
