(function() {
    'use strict';

    angular.module("todolist.projects").service("projectService", projectService);
    projectService.$inject = ['Database'];

    function projectService(Database) {
        var db = new Database("project");

        this.list = function() {
            return db.list();
        };

        this.save = function(project) {
            return db.save(project);
        };

        this.update = function(project) {
            return db.update(project);
        };

        this.get = function(id) {
            return db.get(id);
        };

        this.remove = function(id) {
            return db.remove(id);
        };

        this.removeList = function(ids) {
            return db.removeList(ids);
        };
    }

})();
