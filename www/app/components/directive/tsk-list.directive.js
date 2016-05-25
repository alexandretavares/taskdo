(function() {
    'use strict';

    angular.module("taskdo.components").directive("tskList", TskList);
    TskList.$inject = ['$ionicGesture', 'transformService', '$timeout',
        '$filter', '$ionicScrollDelegate'];

    function TskList($ionicGesture, transformService, $timeout, $filter,
        $ionicScrollDelegate) {

        return {
            scope: {
                icon: '@',
                fields: '=',
                collection: '=',
                selected: '=',
                selectedCount: '=',
                selectedAll: '=',
                swipeLeft: '=',
                swipeRight: '='
            },
            templateUrl: "app/components/directive/partials/tsk-list.html",
            restrict: "E",
            link: function(scope, element, attr) {
                scope.swipingRight = false;
                scope.swipingLeft = false;
                scope.avatarIcon = (scope.icon) ? scope.icon : "star";

                var _dragItem = function(event) {
                    var deltaX = event.gesture.deltaX;

                    transformService.translateX(event.currentTarget, deltaX, 'none');
                    $ionicScrollDelegate.freezeScroll(true);
                };

                var _deepValue = function(obj, path) {
                    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
                        obj = obj[path[i]];
                    };

                    return obj;
                };

                scope.wasSelected = function(id) {
                    return scope.selected[id] != undefined;
                };

                scope.hasSelected = function() {
                    return !angular.equals({}, scope.selected);
                };

                scope.mark = function(item) {
                    if (scope.selected[item._id]) {
                        scope.selectedCount--;
                        delete scope.selected[item._id];

                        if (!scope.hasSelected()) {
                            scope.selectedAll = false;
                        }

                    } else {
                        scope.selectedCount++;
                        scope.selected[item._id] = item;
                    }
                };

                scope.format = function(item, field) {
                    if (field.type == "date") {
                        return $filter('date')(_deepValue(item, field.name), 'dd/MM/yyyy');
                    } else {
                        return _deepValue(item, field.name);
                    }
                };

                scope.onDragRight = function(event) {
                    scope.swipingLeft = false;
                    scope.swipingRight = true;
                    _dragItem(event);
                };

                scope.onDragLeft = function(event) {
                    scope.swipingRight = false;
                    scope.swipingLeft = true;
                    _dragItem(event);
                };

                scope.onRelease = function(event) {
                    transformService.translateX(event.currentTarget, 0, 'ease-out 0.4s');
                    $ionicScrollDelegate.freezeScroll(false);

                    $timeout(function() {
                        scope.swipingLeft = false;
                        scope.swipingRight = false;
                    }, 500);
                };

            }
        };
    }

})();
