var myApp = angular.module('myApp',[]);
$(document).ready(function(){
	$('head').append('<link rel="stylesheet" href="projects.css" type="text/css" />');
	$("#projectsHtml").load("projects.html");
});

myApp.controller('MainCtrl', ['$scope', function($scope) {
	$scope.tooltip = "32";
	$scope.openProjects = function() {
		$( ".projects-container" ).addClass( "projects-center" );
		$(".body-container").addClass("body-upper");

	}
}]);

/*
myApp.controller('MainCtrl', ['$scope', '$sce', function($scope, $sce) {

	//Videos - change the youtube id
	$scope.vidCol1 = [
	  	{title: "Short Film - Stopwatch", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/BWCMA80PjYc")},
	  	{title: "Short Film - The Painting", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/dMysmP1Bz3A")},
	  	{title: "Short Film - Senioritis", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/0VZlmAU3idY")}
	]

	$scope.vidCol2 = [
		{title: "Highlight Video - Basketball", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/srs9vnFRAMU")},
		{title: "Highlight Video - Volleyball", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/vJYim3hr9ck")},
		{title: "Game Montage", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/xdHc64a1Vsc")},
	]

	$scope.vidCol3 = [
		{title: "Motion Graphics - App Promo", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/LjOgB-Fo0dA")},
		{title: "Event Promo", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/spP21pyaqbA")},
		{title: "Interactive Drumset - Early Programming Project", url: $sce.trustAsResourceUrl("https://www.youtube.com/embed/ADA0lN5_ewI")}
	]

	$scope.apps = [
		{title: "The Room Movie Soundboard", 
		url: "theroom.png",
		itunes: "https://itunes.apple.com/us/app/the-room-movie-soundboard/id878083729?mt=8",
		android: "https://play.google.com/store/apps/details?id=com.breadedturtle.TheRoomSoundboard&hl=en"},

		{title: "Perfection", 
		url: "perfection.png",
		itunes: "https://itunes.apple.com/us/app/perfection-perfect-pitch-ear/id980947147?mt=8",
		android: "https://play.google.com/store/apps/details?id=me.benjipelletier.perfectionfree"}
  	]	
  	var dPast = new Date("09/19/1997");
  	var dCurr = new Date();
  	$scope.age = Math.floor((dCurr-dPast)/(3.1556926*Math.pow(10,10)));
}]);
*/