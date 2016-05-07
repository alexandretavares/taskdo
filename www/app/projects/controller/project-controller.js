angular.module("todolist.projects")
.controller("ProjectController", function($scope, $state, $ionicHistory,
    $ionicPopover, $ionicPopup, APP_STATE, projectService) {

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
        if ($state.is(APP_STATE.PROJECTS.LIST)) {
            mv.projects = projectService.list();
        } else {
            _initPopover();

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

    mv.showMore = function($event) {
        _popover.show($event);
    };

    mv.editMode = function() {
        return $state.is(APP_STATE.PROJECTS.EDIT);
    };

    //TODO Armazenar em banco. Exibir notificação
    mv.save = function() {
        if (!$state.params.id) {
            mv.project.createdDate = new Date();
        }

        projectService.save(mv.project);
        $state.go(APP_STATE.PROJECTS.LIST);
    };

    mv.remove = function() {
        //TODO Traduzir
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover projeto',
            template: 'Você tem certeza que deseja remover o projeto?',
            cancelText: 'Não',
            okText: 'Sim'
        });

        confirmPopup.then(function(res) {
            if (res) {
                projectService.remove($state.params.id);
                $state.go(APP_STATE.PROJECTS.LIST);
                console.log("Projeto removido: " + $state.params.id);
            } else {
                console.log("Nenhum projeto removido");
            }
        });
    };

    $scope.$on('$destroy', function() {
        _popover.remove();
    });
});
