(function() {
    'use strict';

    angular.module("todolist.common").constant("APP_STATE", {
        BASE: "app",
        DASHBOARD: "app.dashboard",
        PROJECTS: {
            BASE: "app.projects",
            LIST: "app.projects.list",
            NEW: "app.projects.new",
            EDIT: "app.projects.edit"
        }
    });

})();
