(function() {
    'use strict';

    angular.module("taskdo.tasks").service("taskService", taskService);
    taskService.$inject = ['TABLE', 'Database'];

    function taskService(TABLE, Database) {
        var db = new Database(TABLE.TASK);

        var options = {
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
        };

        this.listOpened = function() {
            var query = {
                dueDate: { $exists: true },
                $or: [
                    { finished: false },
                    { finished: { $exists: false } }
                ]
            };

            return db.find(query, options);
        };

        this.listByProject = function(projectId, start, end) {
            var query = {
                $or: [
                    { finished: false },
                    { finished: { $exists: false } }
                ]
            };

            if (projectId) {
                query["project_id"] = projectId;
            }

            if (start || end) {
                var dateFilter = [{ dueDate: { $exists: true } }];

                if (start) {
                    dateFilter.push({ dueDate: { $gte: start } });
                }

                if (end) {
                    dateFilter.push({ dueDate: { $lte: end } });
                }

                query["$and"] = dateFilter;
            }

            return db.find(query, options);
        };

        this.listFinished = function(projectId) {
            var query = { finished: true };

            if (projectId) {
                query["project_id"] = projectId;
            }

            return db.find(query, options);
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

        this.restore = function(ids) {
            return db.update(ids, {finished: false});
        };
    }

})();
