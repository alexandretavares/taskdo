(function() {
    'use strict';

    angular.module("taskdo.components").service("toastService", ToastService);
    ToastService.$inject = ['$q', '$cordovaToast', '$ionicLoading'];

    function ToastService($q, $cordovaToast, $ionicLoading) {

        this.show = function(message) {
            return $q(function(resolve, reject) {
                if (window.plugins && window.plugins.toast) {
                    $cordovaToast.showShortBottom(message)
                        .then(function(success) {
                            resolve();
                        }, function (error) {
                            reject(error);
                        });
                } else {
                    $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 })
                        .then(function(success) {
                            setTimeout(function() {
                                resolve();
                            }, 2000);
                        }, function (error) {
                            reject(error);
                        });
                }
            });
        };

    }

})();
