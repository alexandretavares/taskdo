(function() {
    'use strict';

    angular.module('taskdo',
        [
            'ionic',
            'angular.filter',
            'ngCordova',
            'ngMessages',
            'pascalprecht.translate',
            'ionic-material',
            'taskdo.common',
            'taskdo.components',
            'taskdo.dashboard',
            'taskdo.settings',
            'taskdo.projects',
            'taskdo.tasks'
        ]
    ).run(run);

    run.$inject = ['$ionicPlatform'];

    function run($ionicPlatform) {
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

            if (typeof navigator.splashscreen !== "undefined") {
                setTimeout(function() {
                    navigator.splashscreen.hide();
                }, 100);
            }

        });
    }
})();
