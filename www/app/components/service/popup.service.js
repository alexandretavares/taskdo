(function() {
    'use strict';

    angular.module("todolist.components").service("popupService", function($ionicPopup) {

        this.remove = function(callback) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Remover registro(s)',
                template: 'Você tem certeza que deseja remover o(s) registro(s)?',
                cancelText: 'Não',
                okText: 'Sim'
            });

            confirmPopup.then(callback);
        };

    });

})();
