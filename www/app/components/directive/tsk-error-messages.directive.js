(function() {
    'use strict';

    angular.module("taskdo.components").directive("tskErrorMessages", function() {
        return {
            scope: {
                field: "=",
                minLength: "@",
                maxLength: "@"
            },
            restrict: "E",
            templateUrl: "app/components/directive/partials/error-messages.html"
        };
    });

})();
