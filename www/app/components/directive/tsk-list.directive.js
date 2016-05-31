(function() {
    'use strict';

    angular.module("taskdo.components").directive("tskList", TskList);
    TskList.$inject = ['$ionicGesture', 'transformService', '$timeout',
        '$filter', '$ionicScrollDelegate'];

    function TskList($ionicGesture, transformService, $timeout, $filter,
        $ionicScrollDelegate) {

        var DRAG_THRESHOLD = 180;
        var OFFSETX_TO_HIDE = 9999;
        var ANIMATION_TIME_FACTOR = 5400;
        var CALLBACK_TIMEOUT = 400;

        return {
            scope: {
                fields: '=',
                collection: '=',
                icon: '@?',
                editable: '=?',
                selected: '=?',
                selectedCount: '=?',
                selectedAll: '=?',
                dragLeft: '=?',
                onDragLeftComplete: '&?',
                dragRight: '=?',
                onDragRightComplete: '&?',
                onRowClick: '&?'
            },
            templateUrl: "app/components/directive/partials/tsk-list.html",
            restrict: "E",
            link: function(scope, element, attr) {
                var _watchByPass = false;
                var _dragCompleted = false;

                scope.editable = (scope.editable != undefined) ? scope.editable : true;
                scope.selected = scope.selected || {};
                scope.selectedCount = scope.selectedCount || 0;
                scope.selectedAll = scope.selectedAll || false;
                scope.draggingRight = false;
                scope.draggingLeft = false;
                scope.avatarIcon = (scope.icon) ? scope.icon : null;

                var _completeDragAnimation = function(target, deltaX) {
                    var offsetX = (deltaX > 0) ? OFFSETX_TO_HIDE : -OFFSETX_TO_HIDE;
                    var animationTime = ANIMATION_TIME_FACTOR / Math.abs(deltaX);
                    var transition = 'linear ' + Math.round(animationTime) + 's';

                    _dragCompleted = true;

                    ionic.requestAnimationFrame(function() {
                        $ionicScrollDelegate.freezeScroll(false);
                        transformService.translateX(target, offsetX, transition);
                    });
                };

                var _dragItem = ionic.animationFrameThrottle(function(event, target) {
                    var deltaX = event.gesture.deltaX;

                    transformService.translateX(target, deltaX, 'none');
                });

                var _deepValue = function(obj, path) {
                    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
                        obj = obj[path[i]];
                    };

                    return obj;
                };

                var _selectAll = function() {
                    var collectionLength = scope.collection.length;

                    for (var i = 0; i < collectionLength; i++) {
                        var selected = scope.selected[scope.collection[i]._id];

                        if (!selected) {
                            scope.selected[scope.collection[i]._id] = scope.collection[i];
                            scope.selectedCount++;
                        }
                    }
                };

                var _unselectAll = function() {
                    scope.selected = {};
                    scope.selectedCount = 0;
                };

                scope.wasSelected = function(id) {
                    return scope.selected[id] != undefined;
                };

                scope.hasSelected = function() {
                    return !angular.equals({}, scope.selected);
                };

                scope.$watch("selectedAll", function(selectedAll) {
                    if (_watchByPass) {
                        _watchByPass = false;
                    } else {
                        if (selectedAll) {
                            _selectAll();
                        } else {
                            _unselectAll();
                        }
                    }
                });

                scope.toggleMark = function(item) {
                    if (!scope.editable) {
                        return;
                    }

                    if (scope.selected[item._id]) {
                        scope.selectedCount--;
                        delete scope.selected[item._id];

                        if (!scope.hasSelected()) {
                            scope.selectedAll = false;
                            _watchByPass = true;
                        }

                    } else {
                        scope.selectedCount++;
                        scope.selected[item._id] = item;

                        if (scope.selectedCount == scope.collection.length) {
                            scope.selectedAll = true;
                            _watchByPass = true;
                        }
                    }
                };

                scope.format = function(item, field) {
                    if (field.type == "date") {
                        return $filter('date')(_deepValue(item, field.name), 'dd/MM/yyyy');
                    } else {
                        return _deepValue(item, field.name);
                    }
                };

                scope.onSwipeRight = function(event, targetId) {
                    if (scope.dragRight) {
                        event.gesture.srcEvent.preventDefault();
                        var target = event.currentTarget;

                        _completeDragAnimation(target, target.clientWidth);

                        if (scope.onDragRightComplete) {
                            $timeout(function() {
                                scope.onDragRightComplete({id: targetId});
                            }, CALLBACK_TIMEOUT);
                        }
                    }
                };

                scope.onDragRight = function(event, targetId) {
                    if (scope.dragRight && !_dragCompleted) {
                        event.gesture.srcEvent.preventDefault();
                        var target = event.currentTarget;

                        if (event.gesture.deltaX > DRAG_THRESHOLD) {
                            _completeDragAnimation(target, target.clientWidth);

                            if (scope.onDragRightComplete) {
                                $timeout(function() {
                                    scope.onDragRightComplete({id: targetId});
                                }, CALLBACK_TIMEOUT);
                            }
                        } else {
                            if (!scope.draggingRight) {
                                $ionicScrollDelegate.freezeScroll(true);
                            }

                            scope.draggingLeft = false;
                            scope.draggingRight = true;
                            _dragItem(event, target);
                        }
                    }
                };

                scope.onSwipeLeft = function(event, targetId) {
                    if (scope.dragLeft) {
                        event.gesture.srcEvent.preventDefault();
                        var target = event.currentTarget;

                        _completeDragAnimation(target, -target.clientWidth);

                        if (scope.onDragLeftComplete) {
                            $timeout(function() {
                                scope.onDragLeftComplete({id: targetId});
                            }, CALLBACK_TIMEOUT);
                        }
                    }
                };

                scope.onDragLeft = function(event, targetId) {
                    if (scope.dragLeft && !_dragCompleted) {
                        event.gesture.srcEvent.preventDefault();
                        var target = event.currentTarget;

                        if (event.gesture.deltaX < -DRAG_THRESHOLD) {
                            _completeDragAnimation(target, -target.clientWidth);

                            if (scope.onDragLeftComplete) {
                                $timeout(function() {
                                    scope.onDragLeftComplete({id: targetId});
                                }, CALLBACK_TIMEOUT);
                            }

                        } else {
                            if (!scope.draggingLeft) {
                                $ionicScrollDelegate.freezeScroll(true);
                            }

                            scope.draggingRight = false;
                            scope.draggingLeft = true;
                            _dragItem(event, target);
                        }
                    }
                };

                scope.onRelease = function(event) {
                    $ionicScrollDelegate.freezeScroll(false);

                    if (_dragCompleted) {
                        _dragCompleted = false;
                    } else {
                        var target = event.currentTarget;

                        ionic.requestAnimationFrame(function() {
                            transformService.translateX(target, 0, 'ease-out 0.4s');

                            $timeout(function() {
                                scope.draggingLeft = false;
                                scope.draggingRight = false;
                            }, CALLBACK_TIMEOUT);
                        });
                    }
                };

                scope.rowClick = function(item) {
                    if (scope.onRowClick) {
                        scope.onRowClick({item: item});
                    }
                };

            }
        };
    }

})();
