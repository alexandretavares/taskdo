(function() {
    'use strict';

    angular.module("taskdo.components").directive("tskSnackbar", TskSnackbar);
    TskSnackbar.$inject = ['$timeout'];

    function TskSnackbar($timeout) {

        var _template = '' +
            '<div class="snackbar ng-hide" ng-show="show">' +
                '<div class="snackbar-text">{{\'i18n.components.snackbar.text\' | translate}}.</div>' +
                '<button class="button button-small button-clear button-purple pull-right"'+
                    'ng-click="undo()">{{\'i18n.components.snackbar.button\' | translate}}</button>' +
            '</div>';

        return {
            scope: {
                show: '=',
                onUndo: '&?'
            },
            template: _template,
            restrict: "E",
            link: function(scope, element, attr) {
                var byPass = false;
                var timeoutPromise = null;

                scope.undo = function() {
                    if (scope.onUndo) {
                        if (timeoutPromise) {
                            $timeout.cancel(timeoutPromise);
                        }

                        byPass = true;
                        scope.show = false;
                        scope.onUndo();
                    }
                };

                scope.$watch("show", function(hasShow) {
                    if (byPass) {
                        byPass = false;
                    } else {
                        if (hasShow) {
                            timeoutPromise = $timeout(function() {
                                byPass = true;
                                scope.show = false;
                            }, 5000);
                        }
                    }
                });

            }
        };
    }

})();
