(function() {
    'use strict';

    angular.module("todolist.components").service("popupService", popupService);
    popupService.$inject = ['$ionicPopup', 'i18nService'];

    function popupService($ionicPopup, i18n) {

        this.remove = function(callback) {
            $ionicPopup.confirm({
                title: i18n.common.popup.remove.title,
                template: i18n.common.popup.remove.content,
                cancelText: i18n.common.popup.buttons.no,
                okText: i18n.common.popup.buttons.yes
            }).then(callback);
        };

    }

})();
