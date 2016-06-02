(function() {
    'use strict';

    angular.module("taskdo.common").controller("MenuController", MenuController);
    MenuController.$inject = ['STATE', 'popupService'];

    function MenuController(STATE, popupService) {
        var mv = this;

        mv.exit = function() {
            popupService.exit().then(function() {
                ionic.Platform.exitApp();
            });
        };

        (function() {
            mv.STATE = STATE;
        })();
    }

})();
