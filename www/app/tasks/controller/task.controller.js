(function() {
    'use strict';

    angular.module("todolist.tasks").controller("TaskController", TaskController);
    TaskController.$inject = [];

    function TaskController() {
        var mv = this;
    }

})();
