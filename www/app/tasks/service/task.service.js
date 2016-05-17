(function() {
    'use strict';

    angular.module("taskdo.tasks").service("taskService", taskService);
    taskService.$inject = ['TABLE', 'Database'];

    function taskService(TABLE, Database) {
        var db = new Database(TABLE.TASK);

        this.list = function() {
            return db.find({}, {
                "$join": [{
                    "project": {
                        "_id": "project_id",
                        "$as": "project",
                        "$required": true,
                        "$multi": false
                    }
                }]
            });
        };

        this.listIncompleteTasks = function() {
            return db.find(
                {
                    $or: [
                        { finished: false },
                        { finished: { $exists: false } }
                    ]
                },
                {
                    "$join": [{
                        "project": {
                            "_id": "project_id",
                            "$as": "project",
                            "$required": true,
                            "$multi": false
                        }
                    }],
                    "$orderBy": {
                        "dueDate": 1
                    }
                }
            );
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
