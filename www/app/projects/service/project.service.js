(function() {
    'use strict';

    //TODO Implementar comunicação com banco de dados ou similar
    angular.module("todolist.projects").service("projectService", function() {

        var _projects = [];

        //TODO Remover
        (function() {
            for (var i = 0; i < 10; i++) {
                _projects.push({
                    id: i,
                    name: "Projeto " + i,
                    createdDate: new Date()
                });
            }
        })();

        var _findById = function(id) {
            var result = _projects.filter(function(project) {
                return project.id == id;
            });

            if (result != null) {
                var element = {};
                angular.copy(result[0], element);

                return element;
            } else {
                return null;
            }
        };

        var _findIndex = function(id) {
            for (var i = 0; i < _projects.length; i++) {
                if (_projects[i].id == id) {
                    return i;
                }
            }

            return null;
        };

        this.list = function() {
            return _projects;
        };

        this.save = function(project) {
            project.id = _projects[_projects.length - 1].id + 1;
            _projects.push(project);
        };

        this.update = function(project) {
            var index = _findIndex(project.id);

            if (index != -1) {
                _projects[index] = project;
            }
        };

        this.get = function(id) {
            return _findById(id);
        };

        this.remove = function(id) {
            var index = _findIndex(id);

            if (index != null) {
                _projects.splice(index, 1);
            } else {
                console.error("Project not found id: " + id);
            }
        };

        this.removeList = function(ids) {
            for (var i = 0; i < ids.length; i++) {
                this.remove(ids[i]);
            }
        };

    });

})();
