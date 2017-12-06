
var mainApp = angular.module('mainApp',[]);

mainApp.controller('MainController', ['$scope', function($scope) {
  $scope.sideProjects = [
    {title: "The Room Soundboard", desc: "some info lmao", img: "images/theroom.png"},
    {title: "The Room Soundboard", desc: "more info", img: "images/perfection.png"}
  ];

}]);

$(document).ready(function(){
  $('ul.tabs').tabs();
});
