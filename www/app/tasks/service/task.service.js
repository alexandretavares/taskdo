(function() {
    'use strict';

    angular.module("taskdo.tasks").service("taskService", taskService);
    taskService.$inject = ['$q', 'TABLE', 'Database'];

    function taskService($q, TABLE, Database) {
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

        this.listOpened = function(projectId, start, end) {
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
            var query = { "finished": true };

            if (projectId) {
                query["project_id"] = projectId;
            }

            return db.find(query, options);
        };

        this.save = function(task) {
            var deferred = $q.defer();
            var query = { name: task.name, project_id: task.project_id };

            if (task.hasOwnProperty("_id")) {
                query["_id"] = { "$ne": task._id };
            }

            db.findOne(query).then(function(doc) {
                if (doc) {
                    deferred.reject("Duplicated element on database");
                } else {
                    if (!task.hasOwnProperty("createdDate")) {
                        task.createdDate = new Date();
                    }

                    db.save(task)
                        .then(function(taskSaved) {
                            deferred.resolve(taskSaved);
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        })
                }
            }).catch(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
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
