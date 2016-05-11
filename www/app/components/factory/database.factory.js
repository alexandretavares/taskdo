(function() {
    'use strict';

    angular.module("todolist.components").factory("Database", databaseFactory);
    databaseFactory.$inject = ['$q'];

    function databaseFactory($q) {
        var _fdb = new ForerunnerDB();
        var _db = _fdb.db("todolist");

        function Database(tableName) {
            var collection = _db.collection(tableName);

            var commit = function(resolve, reject) {
                collection.save(function(error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            };

            this.list = function() {
                return $q(function(resolve, reject) {
                    collection.load(function() {
                        var docs = collection.find();

                        resolve(angular.copy(docs));
                    });
                });
            };

            this.get = function(id) {
                return $q(function(resolve, reject) {
                    var docs = collection.find({_id: {$eq: id}});

                    if (docs.length > 0) {
                        resolve(angular.copy(docs[0]));
                    } else {
                        reject("Record not found in database. Id: " + id);
                    }
                });
            };

            this.save = function(entity) {
                return $q(function(resolve, reject) {
                    collection.insert(entity);
                    commit(resolve, reject);
                });
            };

            this.update = function(entity) {
                return $q(function(resolve, reject) {
                    collection.update({_id: entity._id}, entity, {}, function() {
                        commit(resolve, reject);
                    });
                });
            };

            this.remove = function(id) {
                return $q(function(resolve, reject) {
                    collection.remove({_id: id}, function() {
                        commit(resolve, reject);
                    });
                });
            };

            this.removeList = function(ids) {
                return $q(function(resolve, reject) {
                    collection.remove({
                        _id: ids
                    }, function() {
                        commit(resolve, reject);
                    });
                });
            };
        }

        return Database;
    }

})();
