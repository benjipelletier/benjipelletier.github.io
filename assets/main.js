
var mainApp = angular.module('mainApp',[]);

mainApp.controller('MainController', ['$scope', '$sce', function($scope, $sce) {
  $scope.sideProjects = [
    {title: "The Room Soundboard", 
     desc: 'Soundboard app to supplement the best worst move ever: "The Room".', 
     img: "images/theroom.png", 
     links: ["https://itunes.apple.com/ca/app/the-room-movie-soundboard/id878083729?mt=8", "https://play.google.com/store/apps/details?id=com.breadedturtle.TheRoomSoundboard"]},
    
    {title: "Perfection", 
     desc: "Perfection allows people with perfect pitch to improve their ability to identify pitch.", 
     img: "images/perfection.png",
     links: ["https://itunes.apple.com/us/app/perfection-perfect-pitch-ear-training/id980947147?mt=8", "https://play.google.com/store/apps/details?id=me.benjipelletier.perfectionfree&hl=en"]},
    
    {title: "Searchonym", 
     desc: "Searchonym finds matches on a webpage for the synonyms of a given word.", img: "images/searchonym.png",
     links: ["https://chrome.google.com/webstore/detail/searchonym/dcakhmpgjgoolamccholpcmjdbjembfg?hl=en"]},
    
    {title: "MS Statistics", 
     desc: "Mass Shootings statistics for the United States in 2015.", 
     img: "images/shooting.png",
     links: ["massshootings/index.html"]},
    
    {title: "Regression", 
     desc: "Online simple (x, y) linear regression calculator using basic machine learning and calculus.", 
     img: "images/regression.png",
     links: ["regression/index.html"]}
  ];

$scope.workExp = [
  {company: "Genesys", position: "Font End Developer", link: "http://www.genesys.com/", img: "images/genesys.png",
  desc: "Developed numerous features and fixes for Genesys's GWT-based call centre management system including a dynamically adjustable schedule for users' data. Gained experience in unit and automated Java testing for various features on GWT applications.", api_src: $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=Genesys,Markham&zoom=9&key=AIzaSyAmMXQiUtgnHPVW_M2h_zgbDYBAP2ySgpA")}
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