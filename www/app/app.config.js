(function() {
    'use strict';

    var app = angular.module('taskdo');

    var _loadingTemplate = '' +
        '<div class="loader">' +
            '<svg class="circular">' +
                '<circle class="path" cx="25" cy="25" r="10" fill="none" stroke-width="2" stroke-miterlimit="10"/>' +
            '</svg>' +
        '</div>';

    // Loading component config
    app.constant('$ionicLoadingConfig', {
        template: _loadingTemplate
    });

    app.config(config);
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
