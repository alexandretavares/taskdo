(function() {
    'use strict';

    angular.module('todolist').config(config);
    config.$inject = ['$translateProvider'];

    function config($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'app/i18n/',
                suffix: '.json'
            })
            .registerAvailableLanguageKeys(['en', 'pt_BR'], {
                'en' : 'en', 'en_*': 'en',
                'pt' : 'pt_BR', 'pt_BR': 'pt_BR'
            })
            .preferredLanguage('pt_BR')
            .fallbackLanguage('en')
            .determinePreferredLanguage()
            .useSanitizeValueStrategy('escapeParameters');
    }

})();
