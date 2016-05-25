(function() {
    'use strict';

    angular.module("taskdo.common").service("transformService", transformService);
    transformService.$inject = [];

    function transformService() {
        var _regex = /translate3d\((-?\d+\.?\d*(?:px)?),\s?(-?\d+\.?\d*(?:px)?),\s?(-?\d+\.?\d*(?:px)?)\)/;

        var _normalizeValue = function(value) {
            if (typeof value == "string") {
                if (value.indexOf("px") == -1) {
                    return value + "px";
                } else {
                    return value;
                }
            } else if (typeof value == "number") {
                return value + "px";
            } else {
                return "0px";
            }
        }

        var _getCoordinatesInPixel = function(element) {
            var transform = element.style[ionic.CSS.TRANSFORM];
            var results = transform.match(_regex);

            if (!results) return ["0px", "0px", "0px"];

            return results.slice(1, 4);
        };

        this.translate3d = function(element, x, y, z, transition) {
            var translate = [];
            translate.push(_normalizeValue(x));
            translate.push(_normalizeValue(y));
            translate.push(_normalizeValue(z));

            element.style[ionic.CSS.TRANSFORM] = 'translate3d(' + translate.join(", ") + ')';
            element.style[ionic.CSS.TRANSITION] = transition;
        };

        this.translateX = function(element, x, transition) {
            var coordinates = _getCoordinatesInPixel(element);

            this.translate3d(element, x, coordinates[1], coordinates[2], transition);
        };

    }

})();
