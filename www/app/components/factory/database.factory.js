(function() {
    'use strict';

    angular.module("todolist.components").factory("Database", DatabaseFactory);
    DatabaseFactory.$inject = ['$q', 'TABLE'];

    function DatabaseFactory($q, TABLE) {
        var _fdb = new ForerunnerDB();
        var _db = _fdb.db("todolist");
        var _collections = {};

        (function() {
            angular.forEach(TABLE, function(tableName, key) {
                _collections[tableName] = _db.collection(tableName);
                _collections[tableName].load();
            });
        })();

        function Database(tableName) {
            var collection = _collections[tableName]

            var commit = function(resolve, reject) {
                collection.save(function(error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            };

            this.find = function(query, options) {
                return $q(function(resolve, reject) {
                    collection.load(function() {
                        var docs = collection.find(query, options);
                        resolve(angular.copy(docs));
                    });
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
                        reject(null);
                    }
                });
            };

            this.save = function(entity) {
                return $q(function(resolve, reject) {
                    if (entity.hasOwnProperty("_id")) {
                        collection.update({_id: entity._id}, entity);
                    } else {
                        collection.insert(entity);
                    }

                    commit(resolve, reject);
                });
            };

            this.remove = function(ids) {
                return $q(function(resolve, reject) {
                    collection.remove({ _id: ids }, function() {
                        commit(resolve, reject);
                    });
                });
            };

            this.removeByQuery = function(query) {
                return $q(function(resolve, reject) {
                    collection.remove(query, function() {
                        commit(resolve, reject);
                    });
                });
            };

            this.update = function(ids, fields) {
                return $q(function(resolve, reject) {
                    collection.update({ _id: ids }, fields);
                    commit(resolve, reject);
                });
            };

        }

        return Database;
    }

})();
