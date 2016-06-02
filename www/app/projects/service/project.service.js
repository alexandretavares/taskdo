(function() {
    'use strict';

    angular.module("taskdo.projects").service("projectService", projectService);
    projectService.$inject = ['$q', 'TABLE', 'Database', 'taskService'];

    function projectService($q, TABLE, Database, taskService) {
        var that = this;
        var db = new Database(TABLE.PROJECT);

        this.list = function(hideDefault) {
            if (hideDefault) {
                return db.find({"default": { $exists: false }});
            } else {
                return db.find({}, {});
            }
        };

        this.save = function(project) {
            var deferred = $q.defer();
            var query = { name: project.name };

            if (project.hasOwnProperty("_id")) {
                query["_id"] = { "$ne": project._id };
            }

            db.findOne(query).then(function(doc) {
                if (doc) {
                    deferred.reject("Duplicated element on database");
                } else {
                    if (!project.hasOwnProperty("createdDate")) {
                        project.createdDate = new Date();
                    }

                    db.save(project)
                        .then(function(projectSaved) {
                            deferred.resolve(projectSaved);
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

        this.getDefault = function() {
            return db.findOne({"default": "true"}).then(function(project) {
                if (project != null) {
                    return project;
                } else {
                    return that.save({name: "i18n.default.project", "default": "true"})
                                .then(function(newProject) {
                                    return newProject;
                                });
                }
            });
        };

    }

})();
