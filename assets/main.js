
var mainApp = angular.module('mainApp',[]);

mainApp.controller('MainController', ['$scope', function($scope) {
  $scope.sideProjects = [
    {title: "The Room Soundboard", 
     desc: 'Your favourite sound clips from the cult classic "The Room"', 
     img: "images/theroom.png", 
     links: ["https://itunes.apple.com/ca/app/the-room-movie-soundboard/id878083729?mt=8", "https://play.google.com/store/apps/details?id=com.breadedturtle.TheRoomSoundboard"]},
    
    {title: "Perfection", 
     desc: "Perfection allows people with perfect pitch to practice and improve their ability to identify pitch.", 
     img: "images/perfection.png",
     links: ["https://itunes.apple.com/us/app/perfection-perfect-pitch-ear-training/id980947147?mt=8", "https://play.google.com/store/apps/details?id=me.benjipelletier.perfectionfree&hl=en"]},
    
    {title: "Searchonym", 
     desc: "Searchonym finds matches on a webpage for the synonyms of a given word.", img: "images/shooting.png",
     links: ["https://chrome.google.com/webstore/detail/searchonym/dcakhmpgjgoolamccholpcmjdbjembfg?hl=en"]},
    
    {title: "Mass Shooting Statistics", 
     desc: "more info", 
     img: "images/shooting.png",
     links: ["/massshootings"]},
    
    {title: "Linear Regression Calculator", 
     desc: "more info", 
     img: "images/shooting.png",
     links: ["/regression"]}
  ];

$scope.workExp = [
  {company: "Genesys", position: "Font End Developer", img: "images/genesys.png",
  desc: "klmao oikejhkdf sdjf skdfn sd "}
];
    $scope.currTab = 0;
    $scope.changeTab = function(tab){
        $scope.currTab = tab;
    }
}]);

 $(document).ready(function(){
     
    $('ul.tabs').tabs({
        swipeable: true
    });
  });