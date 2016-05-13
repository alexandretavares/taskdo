(function() {
    'use strict';

    angular.module('todolist').config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider',
        'STATE', 'LANGUAGE'];

    function config($stateProvider, $urlRouterProvider, $translateProvider,
        STATE, LANGUAGE) {

        $translateProvider
            .useStaticFilesLoader({
                prefix: LANGUAGE.PREFIX,
                suffix: LANGUAGE.SUFFIX
            })
            .registerAvailableLanguageKeys(LANGUAGE.KEYS, LANGUAGE.ALIAS)
            .preferredLanguage(LANGUAGE.PREFERRED)
            .fallbackLanguage(LANGUAGE.FALLBACK)
            .determinePreferredLanguage()
            .useSanitizeValueStrategy('escapeParameters');

        $stateProvider.state(STATE.BASE, {
            url: '/app',
            abstract: true,
            templateUrl: 'app/common/partials/menu.html'
        });

        $urlRouterProvider.otherwise("/app/dashboard");
    }

})();
