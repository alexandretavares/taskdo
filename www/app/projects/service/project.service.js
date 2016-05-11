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
            if (!project.hasOwnProperty("createdDate")) {
                project.createdDate = new Date();
            }
            
            return db.save(project);
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
