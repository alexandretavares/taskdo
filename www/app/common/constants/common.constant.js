(function() {
    'use strict';

    angular.module("taskdo.common").constant("STATE", {
        BASE: "app",
        DASHBOARD: "app.dashboard",
        PROJECTS: "app.projects",
        TASKS: {
            OPENED: "app.tasks-opened",
            FINISHED: "app.tasks-finished"
        },
        SETTINGS: "app.settings"
    });

    angular.module("taskdo.common").constant("PRIORITY", {
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

    angular.module("taskdo.common").constant("LANGUAGE", {
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

    angular.module("taskdo.common").constant("TABLE", {
        PROJECT: "project",
        TASK: "task",
        SETTING: "setting"
    });

    angular.module("taskdo.common").constant("DATE_FILTER", {
        WEEK: "WEEK",
        TODAY: "TODAY"
    });

    angular.module("taskdo.common").constant("LIST_FIELDS", {
        DASHBOARD: [
            { name: "name", type: "string" },
            { name: "project.name", type: "string" }
        ],
        PROJECTS: [
            { name: "name", type: "string" },
            { name: "createdDate", type: "date" }
        ],
        TASKS: [
            { name: "name", type: "string" },
            { name: "project.name", type: "string" }
        ]
    });

})();
