(function() {
    'use strict';

    angular.module("todolist.miscellaneous").controller("DashboardController", dashboardController);
    dashboardController.$inject = ['$translate'];

    function dashboardController($translate) {
        var mv = this;
        var defaultTranslate = true;

        mv.switchTranslate = function() {
            var language;

            if (defaultTranslate) {
                language = "en";
            } else {
                language = "pt";
            }

            defaultTranslate = !defaultTranslate;
            $translate.use(language);
        };

    }

})();
