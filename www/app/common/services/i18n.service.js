(function() {
    'use strict';

    angular.module("todolist.common").service("i18nService", i18nService);
    i18nService.$inject = ['$rootScope', '$translate', '$http', '$interpolate'];

    function i18nService($rootScope, $translate, $http, $interpolate) {
        var that = this;

        var _translate = function() {
            var language = $translate.proposedLanguage();
            var file = ['app/i18n/', language, '.json'].join('');

            $http.get(file)
                .success(function(result) {
                    angular.extend(that, result.i18n);
                })
                .error(function(error) {
                    console.error(error);
                });
        };

        this.$interpolate = function(i18nKey, params) {
            return $interpolate(i18nKey)(params);
        };

        $rootScope.$on('$translateChangeSuccess', function() {
            _translate();
        });

        (function() {
            _translate();
        })();
    }

})();
