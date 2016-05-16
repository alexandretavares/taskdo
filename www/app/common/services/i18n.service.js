(function() {
    'use strict';

    angular.module("todolist.common").service("i18nService", i18nService);
    i18nService.$inject = ['$q', '$translate', '$http', '$interpolate',
        'LANGUAGE'];

    function i18nService($q, $translate, $http, $interpolate, LANGUAGE) {
        var that = this;

        var _translate = function(language) {
            return $q(function(resolve, reject) {
                var file = [LANGUAGE.PREFIX, language, LANGUAGE.SUFFIX].join('');

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
                if (language) {
                    $translate.use(language).then(function() {
                        _translate(language)
                            .then(function() {
                                resolve();
                            })
                            .catch(function(error) {
                                reject(error);
                            });
                    });
                } else {
                    _translate($translate.use())
                        .then(function() {
                            resolve();
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                }
            });
        };

        this.getLanguages = function() {
            return LANGUAGE.KEYS;
        };

        this.getCurrentLanguage = function() {
            return $translate.use();
        };

        this.$interpolate = function(i18nKey, params) {
            return $interpolate(i18nKey)(params);
        };

    }

})();
