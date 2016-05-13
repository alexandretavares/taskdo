(function() {
    'use strict';

    angular.module("todolist.settings").controller("SettingController", SettingController);
    SettingController.$inject = ['$scope', 'i18nService', 'toastService', '$ionicPopover', 'settingService'];

    function SettingController($scope, i18n, toastService, $ionicPopover, settingService) {

        var mv = this;
        var _popover = null;

        var _initPopover = function() {
            if (_popover == null) {
                $ionicPopover.fromTemplateUrl('app/settings/partials/setting-more-actions.html', {
                    scope: $scope
                }).then(function(popover) {
                    _popover = popover;
                });
            }
        };

        mv.save = function() {
            settingService.save(mv.setting).then(function() {
                i18n.refresh(mv.setting.language).then(function() {
                    mv.defaultSetting = angular.copy(mv.setting);
                    toastService.show(i18n.settings.messages.success.updated);
                });
            });
        };

        mv.discard = function() {
            mv.setting = angular.copy(mv.defaultSetting);
            _popover.hide();
        };

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        (function() {
            mv.setting = {};
            mv.languages = i18n.getLanguages();

            _initPopover();

            settingService.get().then(function(setting) {
                if (setting != null) {
                    mv.setting = setting;
                } else {
                    mv.setting.language = i18n.getCurrentLanguage();
                }

                mv.defaultSetting = angular.copy(mv.setting);
            });
        })();

    }

})();
