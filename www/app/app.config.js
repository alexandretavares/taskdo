(function() {
    'use strict';

    angular.module('taskdo').config(config);
    config.$inject = ['$urlRouterProvider', '$translateProvider', 'LANGUAGE'];

    function config($urlRouterProvider, $translateProvider, LANGUAGE) {
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

        $urlRouterProvider.otherwise("/app/dashboard");
    }

})();
