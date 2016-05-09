(function() {
    'use strict';

    angular.module("todolist.components").directive("todoErrorMessages", function() {
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
