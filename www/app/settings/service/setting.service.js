(function() {
    'use strict';

    angular.module("taskdo.settings").service("settingService", SettingService);
    SettingService.$inject = ['TABLE', 'Database', '$q'];

    function SettingService(TABLE, Database, $q) {
        var that = this;
        var db = new Database(TABLE.SETTING);

        this.getLanguage = function() {
            return $q(function(resolve, reject) {
                that.get().then(function(setting) {
                    if (setting) {
                        resolve(setting.language);
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
            return db.findOne({}, {});
        };
    }

})();
