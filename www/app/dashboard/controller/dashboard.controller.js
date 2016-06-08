(function() {
    'use strict';

    angular.module("taskdo.dashboard").controller("DashboardController", DashboardController);
    DashboardController.$inject = ['$scope', '$q', '$ionicLoading', 'STATE', 'i18nService',
        'settingService', 'projectService', 'defaultProject', 'popupService'];

    function DashboardController($scope, $q, $ionicLoading, STATE, i18n,
        settingService, projectService, defaultProject, popupService) {

        var mv = this;

        var i18nRefresh = function(resolve, reject, language) {
            i18n.refresh(language)
                .then(function() {
                    resolve();
                })
                .catch(function(error) {
                    reject(error);
                });
        };

        var settingLanguage = function() {
            return $q(function(resolve, reject) {
                settingService.getLanguage().then(function(lang) {
                    if (lang != null) {
                        i18nRefresh(resolve, reject, lang);
                    } else if (typeof navigator.globalization !== "undefined") {
                       navigator.globalization.getPreferredLanguage(function(language) {
                           i18nRefresh(resolve, reject, language.value.split("-")[0]);
                       }, null);
                   } else {
                       i18nRefresh(resolve, reject);
                   }
                });
            });
        };

        var settingDefaultProject = function() {
            projectService.getDefault().then(function(project) {
                angular.extend(defaultProject, project);
            });
        };

        $scope.$on("$ionicView.loaded", function(event, data) {
            $ionicLoading.show();

            settingLanguage()
                .then(function() {
                    $ionicLoading.hide().then(function() {
                        mv.loaded = true;
                    });
                })
                .catch(function(error) {
                    $ionicLoading.hide().then(function() {
                        popupService.fatal().then(function() {
                            ionic.Platform.exitApp();
                        });
                    });
                });
        });

        (function() {
            mv.STATE = STATE;
            mv.loaded = false;

            settingDefaultProject();
        })();
    }

})();
