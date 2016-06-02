(function() {
    'use strict';

    angular.module("taskdo.dashboard").controller("DashboardController", DashboardController);
    DashboardController.$inject = ['STATE'];

    function DashboardController(STATE) {
        var mv = this;

        (function() {
            mv.STATE = STATE;
        })();
    }

})();
