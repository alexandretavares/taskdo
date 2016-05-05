angular.module("todolist.projects")
.controller("ProjectController", function($scope, $ionicSideMenuDelegate) {
    var mv = this;

    mv.projects = [];

    for (var i = 0; i < 5; i++) {
        mv.projects.push({
            name: "Projeto " + i
        });
    }

    console.log("show");

    //$ionicSideMenuDelegate.toggleLeft();
});
