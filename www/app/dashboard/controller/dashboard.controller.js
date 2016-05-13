(function() {
    'use strict';

    angular.module("todolist.dashboard").controller("DashboardController", DashboardController);
    DashboardController.$inject = ['$scope', '$translate', 'settingService'];

    function DashboardController($scope, $translate, settingService) {
        var mv = this;

        (function() {

            settingService.getLanguage().then(function(lang) {
                if (lang != null) {
                    $translate.use(lang);
                }
            });

        })();
    }

})();
