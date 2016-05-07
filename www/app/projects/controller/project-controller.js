angular.module("todolist.projects")
.controller("ProjectController", function($scope, $state, $ionicHistory,
    $ionicPopover, $ionicPopup, APP_STATE, projectService, toastService) {

    var mv = this;
    var _popover = null;

    var _initPopover = function() {
        $ionicPopover.fromTemplateUrl('app/projects/partials/project-more-actions.html', {
            scope: $scope
        }).then(function(popover) {
            _popover = popover;
        });
    };

    mv.init = function() {
        mv.selected = {};
        mv.selectedAll = false;
        mv.newMode = APP_STATE.PROJECTS.NEW;
        mv.editMode = APP_STATE.PROJECTS.EDIT;
        mv.listMode = APP_STATE.PROJECTS.LIST;

        _initPopover();

        if ($state.is(mv.listMode)) {
            mv.projects = projectService.list();
        } else {
            if ($state.params.id) {
                mv.project = projectService.get($state.params.id);
            } else {
                mv.project = {};
            }
        }
    };

    mv.goBack = function() {
        $ionicHistory.goBack();
    };

    mv.showMoreActions = function($event) {
        _popover.show($event);
    };

    mv.closeMoreActions = function() {
        _popover.hide();
    }

    mv.isEditMode = function() {
        return $state.is(mv.editMode);
    };

    mv.isListMode = function() {
        return $state.is(mv.listMode);
    };

    mv.hasSelected = function() {
        return angular.equals({}, mv.selected);
    };

    mv.checkSelected = function(id) {
        if (!mv.selected[id]) {
            delete mv.selected[id];
        }
    };

    mv.selectAll = function() {
        mv.selectedAll = !mv.selectedAll;

        if (mv.selectedAll) {
            for (var i = 0; i < mv.projects.length; i++) {
                mv.selected[mv.projects[i].id] = true;
            }
        } else {
            mv.selected = {};
        }

        mv.closeMoreActions();
    };

    //TODO Armazenar em banco. Exibir notificação
    mv.save = function() {
        if (!$state.params.id) {
            mv.project.createdDate = new Date();
        }

        projectService.save(mv.project);
        toastService.show("Registro salvo com sucesso");
        $state.go(mv.listMode);
    };

    mv.remove = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover projeto',
            template: 'Você tem certeza que deseja remover o projeto?',
            cancelText: 'Não',
            okText: 'Sim'
        });

        confirmPopup.then(function(res) {
            if (res) {
                projectService.remove($state.params.id);
                toastService.show("Registro removido com sucesso");
                $state.go(mv.listMode);
            }
        });
    };

    mv.removeSelected = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover selecionados',
            template: 'Você tem certeza que deseja remover os registros selecionados?',
            cancelText: 'Não',
            okText: 'Sim'
        });

        confirmPopup.then(function(res) {
            if (res) {
                var projectsToRemove = [];

                angular.forEach(mv.selected, function(value, key) {
                    projectsToRemove.push(key);
                });

                projectService.removeList(projectsToRemove);
                mv.selected = {};

                toastService.show("Registros removidos com sucesso");
            }
        });
    };

    $scope.$on('$destroy', function() {
        _popover.remove();
    });
});
