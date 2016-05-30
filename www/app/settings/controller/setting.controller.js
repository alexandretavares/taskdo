(function() {
    'use strict';

    angular.module("taskdo.settings").controller("SettingController", SettingController);
    SettingController.$inject = ['$scope', 'i18nService', 'toastService',
        '$ionicModal', 'settingService', 'ionicMaterialInk', '$timeout'];

    function SettingController($scope, i18n, toastService, $ionicModal,
        settingService, ionicMaterialInk, $timeout) {

        var mv = this;
        var _partials = "app/settings/partials/";

        var _modalForm = null;
        var _modalAbout = null;
        var _modalOptions = {
            scope: $scope,
            animation: 'slide-in-up'
        };

        mv.showModal = function(modalName) {
            if (modalName == mv.MODAL.ABOUT) {
                _modalAbout.show().then(function() {
                    mv.visibleModal = true;
                });
            } else {
                _modalForm.show().then(function() {
                    mv.visibleModal = true;
                });
            }
        };

        mv.hideModal = function(modalName) {
            mv.visibleModal = false;

            if (modalName == mv.MODAL.ABOUT) {
                _modalAbout.hide();
            } else {
                _modalForm.hide().then(function () {
                    mv.setting = angular.copy(mv.defaultSetting);
                });
            }
        };

        mv.save = function() {
            settingService.save(mv.setting).then(function() {
                mv.visibleModal = false;

                _modalForm.hide().then(function () {
                    mv.defaultSetting = angular.copy(mv.setting);

                    i18n.refresh(mv.setting.language).then(function() {
                        toastService.show(i18n.settings.messages.success.updated);
                    });
                });
            });
        };

        $scope.$on("$ionicView.loaded", function() {
            settingService.get().then(function(setting) {
                if (setting != null) {
                    mv.setting = setting;
                } else {
                    mv.setting.language = i18n.getCurrentLanguage();
                }

                mv.defaultSetting = angular.copy(mv.setting);

                $timeout(function() {
                    ionicMaterialInk.displayEffect();
                }, 300);
            });
        });

        (function() {
            mv.setting = {};
            mv.visibleModal = false;
            mv.languages = i18n.getLanguages();
            mv.MODAL = { ABOUT: "ABOUT", FORM: "FORM" };

            $ionicModal.fromTemplateUrl(_partials + 'setting-form.html', _modalOptions)
                .then(function(modal) {
                    _modalForm = modal;
                });

            $ionicModal.fromTemplateUrl(_partials + 'about.html', _modalOptions)
                .then(function(modal) {
                    _modalAbout = modal;
                });
        })();

    }

})();
