(function() {
    'use strict';

    angular.module("todolist.tasks").service("taskService", taskService);
    taskService.$inject = ['Database'];

    function taskService(Database) {
        var db = new Database("task");

        this.list = function() {
            return db.find({}, {
                "$join": [{
                    "project": {
                        "_id": "project_id",
                        "$as": "project",
                        "$required": false,
                        "$multi": false
                    }
                }]
            });
        };

        this.save = function(task) {
            if (!task.hasOwnProperty("createdDate")) {
                task.createdDate = new Date();
            }

            return db.save(task);
        };

        this.get = function(id) {
            return db.get(id);
        };

        this.remove = function(ids) {
            return db.remove(ids);
        };

        this.removeByProject = function(projectId) {
            return db.removeByQuery({"project_id": projectId});
        };

        this.finish = function(ids) {
            return db.update(ids, {finished: true});
        };
    }

})();
