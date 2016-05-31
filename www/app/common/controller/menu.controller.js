(function() {
    'use strict';

    angular.module("taskdo.common").controller("MenuController", MenuController);
    MenuController.$inject = ['$scope', 'STATE', 'popupService', 'ionicMaterialInk',
        '$timeout', 'defaultProject', 'DATE_FILTER'];

    function MenuController($scope, STATE, popupService, ionicMaterialInk,
        $timeout, defaultProject, DATE_FILTER) {

        var mv = this;

        mv.exit = function() {
            popupService.exit().then(function() {
                ionic.Platform.exitApp();
            });
        };

        (function() {
            mv.STATE = STATE;
            mv.DATE_FILTER = DATE_FILTER;
            mv.defaultProject = defaultProject;

            $timeout(function() {
                ionicMaterialInk.displayEffect();
            }, 300);
        })();
    }

})();
