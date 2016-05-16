(function() {
    'use strict';

    angular.module("todolist.projects").service("projectService", projectService);
    projectService.$inject = ['Database', 'taskService'];

    function projectService(Database, taskService) {
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

        this.remove = function(ids) {
            return taskService.removeByProject(ids)
                .then(function() {
                    return db.remove(ids)
                        .then(function() {
                            return true;
                        })
                        .catch(function(error) {
                            console.error(error);
                            return false;
                        });
                })
                .catch(function(error) {
                    console.error(error);
                    return false;
                });
        };
    }

})();
