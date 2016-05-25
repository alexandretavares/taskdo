(function() {
    'use strict';

    angular.module("taskdo.projects").controller("ProjectController", ProjectController);

    ProjectController.$inject = ['$scope', '$ionicPopover', '$ionicModal', 'projectService',
        'toastService', 'popupService', 'i18nService', '$timeout', 'ionicMaterialInk', 'CRUD_FIELDS'];

    function ProjectController($scope, $ionicPopover, $ionicModal, projectService,
        toastService, popupService, i18n, $timeout, ionicMaterialInk, CRUD_FIELDS) {

        var mv = this;
        var _popover = null;
        var _modal = null;

        var _initPopover = function() {
            if (_popover == null) {
                $ionicPopover.fromTemplateUrl('app/projects/partials/project-more-actions.html', {
                    scope: $scope
                }).then(function(popover) {
                    _popover = popover;
                });
            }
        };

        var _initModal = function() {
            $ionicModal.fromTemplateUrl('app/projects/partials/project-form.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                _modal = modal;
            });
        };

        mv.refreshList = function() {
            projectService.list()
                .then(function(projects) {
                    mv.projects = projects;

                    $timeout(function() {
                        ionicMaterialInk.displayEffect();
                    }, 300);
                })
                .catch(function(error) {
                    mv.projects = [];
                    console.error(error);
                });
        };

        mv.showMoreActions = function($event) {
            _popover.show($event);
        };

        mv.closeMoreActions = function() {
            _popover.hide();
        };

        mv.showForm = function(edit) {
            if (edit && mv.hasOnlySelected()) {
                var firstKey = Object.keys(mv.selected)[0];
                mv.project = angular.copy(mv.selected[firstKey]);
            } else {
                mv.project = {};
            }

            _modal.show();
        };

        mv.hideForm = function() {
            mv.project = {};
            _modal.hide();
        };

        mv.hasOnlySelected = function() {
            return (!angular.equals({}, mv.selected) && mv.selectedCount == 1);
        }

        mv.hasSelected = function() {
            return !angular.equals({}, mv.selected);
        };

        mv.selectAll = function() {
            if (mv.projects.length > 0) {
                mv.selectedAll = !mv.selectedAll;

                if (mv.selectedAll) {
                    for (var i = 0; i < mv.projects.length; i++) {
                        mv.selected[mv.projects[i]._id] = mv.projects[i];
                        mv.selectedCount++;
                    }
                } else {
                    mv.unselectAll();
                }

                mv.closeMoreActions();
            }
        };

        mv.unselectAll = function() {
            mv.selected = {};
            mv.selectedAll = false;
            mv.selectedCount = 0;
        };

        mv.save = function() {
            if (mv.projectForm.$invalid) {
                toastService.show(i18n.common.validations.requiredFields);
            } else {
                projectService.save(mv.project)
                    .then(function() {
                        if (mv.project.hasOwnProperty("_id")) {
                            toastService.show(i18n.common.messages.success.updated);

                        } else {
                            toastService.show(i18n.common.messages.success.created);
                        }

                        mv.unselectAll();
                        mv.refreshList();
                        mv.hideForm();
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            }
        };

        mv.removeSelected = function() {
            popupService.remove().then(function() {
                var projectsToRemove = [];

                angular.forEach(mv.selected, function(value, key) {
                    projectsToRemove.push(key);
                });

                projectService.remove(projectsToRemove)
                    .then(function() {
                        mv.unselectAll();
                        toastService.show(i18n.common.messages.success.removedSelected);
                        mv.refreshList();
                    });
            });
        };

        $scope.$on('$destroy', function() {
            _popover.remove();
        });

        (function() {
            mv.projects = [];
            mv.project = {};
            mv.selected = {};
            mv.selectedCount = 0;
            mv.selectedAll = false;
            mv.fields = CRUD_FIELDS.PROJECTS;

            _initPopover();
            _initModal();
            mv.refreshList();
        })();
    }

})();
