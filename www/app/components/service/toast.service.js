(function() {
    'use strict';

    angular.module("todolist.components").service("toastService", toastService);
    toastService.$inject = ['$cordovaToast', '$ionicLoading'];

    function toastService($cordovaToast, $ionicLoading) {

        this.show = function(message) {
            if (window.plugins && window.plugins.toast) {
                $cordovaToast.showShortBottom(message);
            } else {
                $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 });
            }
        };

    }

})();
