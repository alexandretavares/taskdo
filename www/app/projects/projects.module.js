(function() {
    'use strict';

    angular.module("taskdo.projects", ['taskdo.common']).config(config);
    config.$inject = ['$stateProvider', 'STATE'];

    function config($stateProvider, STATE) {
        $stateProvider.state(STATE.PROJECTS, {
            url: "/projects/list",
            views: {
                'content-menu': {
                    templateUrl: "app/projects/partials/project-list.html",
                    controller: "ProjectController",
                    controllerAs: "mv"
                }
            }
        });
    }

})();
