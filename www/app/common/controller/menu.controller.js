(function() {
    'use strict';

    angular.module("taskdo.common").controller("MenuController", MenuController);
    MenuController.$inject = ['$rootScope', '$ionicSideMenuDelegate', 'STATE', 'popupService'];

    function MenuController($rootScope, $ionicSideMenuDelegate, STATE, popupService) {
        var mv = this;

        mv.exit = function() {
            popupService.exit().then(function() {
                ionic.Platform.exitApp();
            });
        };

        (function() {
            mv.STATE = STATE;

            $rootScope.$on('$ionicView.enter',
                function(event, toState, toParams, fromState, fromParams) {
                    if ($ionicSideMenuDelegate.isOpenLeft()) {
                        $ionicSideMenuDelegate.toggleLeft(false);
                    }
                }
            );
        })();
    }

})();
