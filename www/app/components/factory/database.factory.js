(function() {
    'use strict';

    angular.module("taskdo.components").factory("Database", DatabaseFactory);
    DatabaseFactory.$inject = ['$q'];

    function DatabaseFactory($q) {
        var _fdb = new ForerunnerDB();
        var _db = _fdb.db("taskdo");

        function Database(tableName) {
            var that = this;
            var loaded = false;
            var collection = _db.collection(tableName);

            var commit = function(resolve, reject, entity) {
                collection.save(function(error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(entity);
                    }
                });
            };

            var load = function(callback) {
                if (loaded) {
                    callback();
                } else {
                    collection.load(function() {
                        loaded = true;
                        callback();
                    });
                }
            };

            this.findOne = function(query, options) {
                return $q(function(resolve, reject) {
                    load(function() {
                        var docs = collection.find(query, options);

                        if (docs.length > 0) {
                            resolve(angular.copy(docs[0]));
                        } else {
                            resolve(null);
                        }
                    });
                });
            };

            this.find = function(query, options) {
                return $q(function(resolve, reject) {
                    load(function() {
                        var docs = collection.find(query, options);
                        resolve(angular.copy(docs));
                    });
                });
            };

            this.get = function(id) {
                return $q(function(resolve, reject) {
                    load(function() {
                        var docs = collection.find({_id: {$eq: id}});

                        if (docs.length > 0) {
                            resolve(angular.copy(docs[0]));
                        } else {
                            reject(null);
                        }
                    });
                });
            };

            this.save = function(obj) {
                return $q(function(resolve, reject) {
                   var entity = angular.copy(obj);

                   angular.forEach(entity, function(value, key) {
                       if (value instanceof Date) {
                           entity[key] = _db.make(value);
                       }
                   });

                   if (entity.hasOwnProperty("_id")) {
                       collection.update({_id: entity._id}, entity);
                   } else {
                       collection.insert(entity);
                   }

                   commit(resolve, reject, entity);
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
