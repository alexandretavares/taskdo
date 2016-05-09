(function() {
    'use strict';

    angular.module("todolist.projects")
    .controller("ProjectController", function($scope, $state, $ionicHistory,
        $ionicPopover, APP_STATE, projectService, toastService, popupService) {

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

        mv.isInvalidForm = function() {
            if (mv.isEditMode()) {
                return mv.projectForm.$invalid;
            } else {
                return mv.projectForm.$invalid || mv.projectForm.$pristine;
            }
        };

        mv.hasSelected = function() {
            return !angular.equals({}, mv.selected);
        };

        mv.checkSelected = function(id) {
            if (!mv.selected[id]) {
                delete mv.selected[id];
            }

            if (!mv.hasSelected() && mv.selectedAll) {
                mv.selectedAll = false;
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

        mv.save = function() {
            var msg;

            if ($state.params.id) {
                msg = "Registro atualizado com sucesso";
                projectService.update(mv.project);
            } else {
                msg = "Registro criado com sucesso";
                mv.project.createdDate = new Date();
                projectService.save(mv.project);
            }

            $state.go(mv.listMode).then(function() {
                toastService.show(msg);
            });
        };

        mv.remove = function() {
            popupService.remove(function(res) {
                if (res) {
                    projectService.remove($state.params.id);

                    $state.go(mv.listMode).then(function() {
                        toastService.show("Registro removido com sucesso");
                    });
                }
            });
        };

        mv.removeSelected = function() {
            popupService.remove(function(res) {
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

})();
