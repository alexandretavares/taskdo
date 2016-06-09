(function() {
    'use strict';

    angular.module("taskdo.components").service("toastService", ToastService);
    ToastService.$inject = ['$cordovaToast', '$ionicLoading'];

    function ToastService($cordovaToast, $ionicLoading) {

        this.show = function(message) {
            if (window.plugins && window.plugins.toast) {
                $cordovaToast.showShortBottom(message);
            } else {
                $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 });
            }
        };

    }

})();
