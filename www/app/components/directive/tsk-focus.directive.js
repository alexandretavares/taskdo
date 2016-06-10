/*
* Thanks SO - Umut Benzer (http://fiddle.jshell.net/ubenzer/9FSL4/8/)
*/
(function() {
    'use strict';

    angular.module("taskdo.components").directive("tskFocus", TskFocus);
    TskFocus.$inject = ['$timeout'];

    function TskFocus($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                scope.$watch(attr.tskFocus, function(newValue, oldValue) {
                    if (newValue) {
                        element[0].focus();
                    }
                });

                element.bind("blur", function(e) {
                    $timeout(function() {
                        scope.$apply(attr.tskFocus + "=false");
                    }, 0);
                });

                element.bind("focus", function(e) {
                    $timeout(function() {
                        scope.$apply(attr.tskFocus + "=true");
                    }, 0);
                });
            }
        };
    }

})();
