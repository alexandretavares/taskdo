angular.module("todolist.projects").service("projectService", function() {

    var _projects = [];

    (function() {
        for (var i = 0; i < 5; i++) {
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

        return result ? result[0] : null;
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
        if (project.id != null) {
            var storedProject = _findById(project.id);

            if (storedProject != null) {
                storedProject = project;
            }
        } else {
            //TODO Remover isso
            project.id = _projects[_projects.length - 1].id + 1;

            _projects.push(project);
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
