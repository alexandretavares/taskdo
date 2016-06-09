(function() {
    'use strict';

    angular.module("taskdo.common").service("i18nService", I18nService);
    I18nService.$inject = ['$q', '$translate', '$http', '$interpolate', 'LANGUAGE'];

    function I18nService($q, $translate, $http, $interpolate, LANGUAGE) {
        var that = this;

        var _translate = function(language) {
            return $q(function(resolve, reject) {
                var file = [LANGUAGE.PREFIX, that.getCurrentLanguage(), LANGUAGE.SUFFIX].join('');

                $http.get(file)
                    .success(function(result) {
                        angular.extend(that, result.i18n);
                        resolve();
                    })
                    .error(function(error) {
                        reject(error);
                    });
            });
        };

        this.refresh = function(language) {
            return $q(function(resolve, reject) {
                var lang = language || $translate.resolveClientLocale();
                lang = lang.toLowerCase();

                $translate.use(lang).then(function() {
                    _translate()
                        .then(function() {
                            resolve();
                        })
                        .catch(function(error) {
                            console.error(error);
                            reject(error);
                        });
                });
            });
        };

        this.getLanguages = function() {
            return LANGUAGE.KEYS;
        };

        this.getCurrentLanguage = function() {
            return $translate.use().toLowerCase();
        };

        this.$interpolate = function(i18nKey, params) {
            return $interpolate(i18nKey)(params);
        };

    }

})();
