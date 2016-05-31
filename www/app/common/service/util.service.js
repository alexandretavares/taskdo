(function() {
    'use strict';

    angular.module("taskdo.common").service("utilService", utilService);
    utilService.$inject = [];

    function utilService() {
        this.getWeekRangeOfDate = function(date) {
            var daysOnWeek = 6;
            var dayOfWeek = date.getDay();

            var start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            start.setDate(start.getDate() - dayOfWeek);

            var end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            end.setDate(end.getDate() + (daysOnWeek - dayOfWeek));

            return {start: start, end: end};
        };
    }

})();
