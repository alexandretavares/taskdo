(function() {
    'use strict';

    angular.module("taskdo.common").controller("MenuController", MenuController);
    MenuController.$inject = ['$scope', 'MENU', 'popupService', 'ionicMaterialInk', '$timeout'];

    function MenuController($scope, MENU, popupService, ionicMaterialInk, $timeout) {
        var mv = this;

        mv.exit = function() {
            popupService.exit().then(function() {
                ionic.Platform.exitApp();
            });
        };

        (function() {
            mv.MENU = MENU;

            $timeout(function() {
                ionicMaterialInk.displayEffect();
            }, 300);
        })();
    }

})();
