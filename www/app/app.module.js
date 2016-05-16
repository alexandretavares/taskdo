(function() {
    'use strict';

    angular.module('todolist',
        [
            'ionic', 'ngCordova', 'ngMessages', 'pascalprecht.translate',
            'todolist.common',
            'todolist.components',
            'todolist.dashboard',
            'todolist.settings',
            'todolist.projects',
            'todolist.tasks'
        ]
    ).run(run);

    run.$inject = ['$ionicPlatform', '$translate', 'settingService', 'i18nService'];

    function run($ionicPlatform, $translate, settingService, i18n) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
              // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
              // for form inputs)
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

              // Don't remove this line unless you know what you are doing. It stops the viewport
              // from snapping when text inputs are focused. Ionic handles this internally for
              // a much nicer keyboard experience.
              cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            // Setting the language
            settingService.getLanguage().then(function(lang) {
                if (lang != null) {
                    i18n.refresh(lang);
                } else {
                    if (typeof navigator.globalization !== "undefined") {
                       navigator.globalization.getPreferredLanguage(function(language) {
                           i18n.refresh((language.value).split("-")[0]);
                       }, null);
                   } else {
                       i18n.refresh();
                   }
                }
            });

        });
    }
})();
