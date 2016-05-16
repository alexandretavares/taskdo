(function() {
    'use strict';

    angular.module("todolist.common").constant("STATE", {
        BASE: "app",
        DASHBOARD: "app.dashboard",
        PROJECTS: {
            BASE: "app.projects",
            LIST: "app.projects.list",
            NEW: "app.projects.new",
            EDIT: "app.projects.edit",
            SHOW: "app.projects.show"
        },
        TASKS: {
            BASE: "app.tasks",
            LIST: "app.tasks.list",
            NEW: "app.tasks.new",
            EDIT: "app.tasks.edit"
        },
        SETTINGS: "app.settings"
    });

    angular.module("todolist.common").constant("PRIORITY", {
        CRITICAL: {
            code: "CRITICAL",
            name: "i18n.priority.critical"
        },
        HIGHEST: {
            code: "HIGHEST",
            name: "i18n.priority.highest"
        },
        HIGH: {
            code: "HIGH",
            name: "i18n.priority.high"
        },
        MEDIUM: {
            code: "MEDIUM",
            name: "i18n.priority.medium"
        },
        LOW: {
            code: "LOW",
            name: "i18n.priority.low"
        },
        LOWEST: {
            code: "LOWEST",
            name: "i18n.priority.lowest"
        }
    });

    angular.module("todolist.common").constant("LANGUAGE", {
        PREFIX: "app/i18n/",
        SUFFIX: ".json",
        KEYS: ['en', 'pt_br'],
        ALIAS: {
            'en' : 'en', 'en_*': 'en', 'en-*': 'en',
            'pt' : 'pt_br', 'pt_*': 'pt_br', 'pt-*': 'pt_br'
        },
        PREFERRED: "en",
        FALLBACK: "en"
    });

    angular.module("todolist.common").constant("TABLE", {
        PROJECT: "project",
        TASK: "task",
        SETTING: "setting"
    });

})();
