(function() {
    'use strict';

    angular.module("taskdo.components").directive("tskEmptyPage", TskEmptyPage);
    TskEmptyPage.$inject = [];

    function TskEmptyPage() {
        var _template = '' +
            '<div class="row empty-page" ng-class="{\'show\': show}">' +
                '<div class="col text-center">' +
                    '<i class="icon material-icons md-dark md-inactive {{icon}}"></i>' +
                    '<h2 ng-bind="title"></h2>' +
                    '<p ng-bind="subtitle"></p>' +
                '</div>' +
            '</div>';

        return {
            scope: {
                show: '=',
                icon: '@',
                title: '@',
                subtitle: '@'
            },
            template: _template,
            restrict: 'E'
        };
    }

})();
