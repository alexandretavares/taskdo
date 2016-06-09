(function() {
    'use strict';

    angular.module("taskdo.components").service("popupService", PopupService);
    PopupService.$inject = ['$q', '$ionicPopup', 'i18nService'];

    function PopupService($q, $ionicPopup, i18n) {

        var _confirmPopup = function(i18nOjb) {
            return $q(function(resolve, reject) {
                $ionicPopup.confirm({
                        title: i18nOjb.title,
                        template: i18nOjb.content,
                        cancelText: i18n.common.popup.buttons.no,
                        okText: i18n.common.popup.buttons.yes,
                        okType: "button-stable"
                    })
                    .then(function(result) {
                        if (result) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        };

        var _alertPopup = function(i18nOjb) {
            return $q(function(resolve, reject) {
                $ionicPopup.alert({
                        title: i18nOjb.title,
                        template: i18nOjb.content,
                        okText: i18n.common.popup.buttons.ok,
                        okType: "button-stable"
                    })
                    .then(function() {
                        resolve();
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        };

        this.remove = function() {
            return _confirmPopup(i18n.common.popup.remove);
        };

        this.finish = function() {
            return _confirmPopup(i18n.common.popup.finish);
        };

        this.restore = function() {
            return _confirmPopup(i18n.common.popup.restore);
        };

        this.exit = function(callback) {
            return _confirmPopup(i18n.common.popup.exit);
        };

        this.fatal = function() {
            return _alertPopup(i18n.common.popup.error.fatal);
        };

    }

})();
