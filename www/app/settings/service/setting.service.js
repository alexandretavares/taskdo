(function() {
    'use strict';

    angular.module("todolist.settings").service("settingService", settingService);
    settingService.$inject = ['TABLE', 'Database', '$q'];

    function settingService(TABLE, Database, $q) {
        var db = new Database(TABLE.SETTING);

        this.getLanguage = function() {
            return $q(function(resolve, reject) {
                db.list().then(function(docs) {
                    if (docs.length > 0) {
                        resolve(docs[0].language);
                    } else {
                        resolve(null);
                    }
                });
            });
        };

        this.save = function(setting) {
            return db.save(setting);
        };

        this.get = function() {
            return $q(function(resolve, reject) {
                db.list().then(function(docs) {
                    if (docs.length > 0) {
                        resolve(angular.copy(docs[0]));
                    } else {
                        resolve(null);
                    }
                });
            });
        };

    }

})();
