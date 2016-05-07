angular.module("todolist.miscellaneous").service("toastService", function($cordovaToast, $ionicLoading) {

    this.show = function(message) {
        if (window.plugins && window.plugins.toast) {
            $cordovaToast.showShortBottom(message);
        } else {
            $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 });
        }
    };

});
