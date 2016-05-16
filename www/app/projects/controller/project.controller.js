(function() {
    'use strict';

    angular.module("todolist.projects").controller("ProjectController", ProjectController);

    ProjectController.$inject = ['$scope', '$state', '$ionicHistory', '$ionicPopover',
        'STATE', 'projectService', 'toastService', 'popupService', 'i18nService'];

    function ProjectController($scope, $state, $ionicHistory, $ionicPopover,
        STATE, projectService, toastService, popupService, i18n) {

        var mv = this;
        var _popover = null;

        var _initPopover = function() {
            if (_popover == null) {
                $ionicPopover.fromTemplateUrl('app/projects/partials/project-more-actions.html', {
                    scope: $scope
                }).then(function(popover) {
                    _popover = popover;
                });
            }
        };

        mv.refreshList = function() {
            projectService.list()
                .then(function(projects) {
                    mv.projects = projects;
                })
                .catch(function(error) {
                    mv.projects = [];
                    console.error(error);
                });
        };

        mv.goBack = function() {
            $ionicHistory.goBack();
        };

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        mv.closeMoreActions = function() {
            _popover.hide();
        };

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
                    mv.selected[mv.projects[i]._id] = true;
                }
            } else {
                mv.selected = {};
            }

            mv.closeMoreActions();
        };

        mv.save = function() {
            projectService.save(mv.project)
                .then(function() {
                    if ($state.params.id) {
                        toastService.show(i18n.common.messages.success.updated);
                    } else {
                        toastService.show(i18n.common.messages.success.created);
                    }

                    $state.go(mv.listMode).then(function() {
                        mv.refreshList();
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        mv.remove = function() {
            popupService.remove().then(function() {
                projectService.remove($state.params.id)
                    .then(function() {
                        toastService.show(i18n.common.messages.success.removed);

                        $state.go(mv.listMode).then(function() {
                            mv.refreshList();
                        });
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            });
        };

        mv.removeSelected = function() {
            popupService.remove().then(function() {
                var projectsToRemove = [];

                angular.forEach(mv.selected, function(value, key) {
                    projectsToRemove.push(key);
                });

                projectService.remove(projectsToRemove)
                    .then(function() {
                        mv.selected = {};
                        toastService.show(i18n.common.messages.success.removedSelected);
                        mv.refreshList();
                    });
            });
        };

        $scope.$on("$ionicView.beforeEnter", function() {
            if (!$state.is(mv.listMode)) {
                mv.project = {};
                mv.projectForm.$setPristine();

                if ($state.params.id) {
                    projectService.get($state.params.id)
                        .then(function(project) {
                            mv.project = project;
                        });
                }
            }
        });

        $scope.$on('$destroy', function() {
            _popover.remove();
        });

        (function() {
            mv.projects = [];
            mv.project = {};
            mv.selected = {};
            mv.selectedAll = false;
            mv.newMode = STATE.PROJECTS.NEW;
            mv.editMode = STATE.PROJECTS.EDIT;
            mv.listMode = STATE.PROJECTS.LIST;
            mv.showMode = STATE.PROJECTS.SHOW;

            _initPopover();
            mv.refreshList();
        })();
    }

})();
