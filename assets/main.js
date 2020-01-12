
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
    
    {title: "Regression", 
     desc: "Online simple (x, y) linear regression calculator using basic machine learning and calculus.", 
     img: "images/regression.png",
     links: ["regression/index.html"]}
  ];

$scope.workExp = [
  {company: "Autodesk", position: "Software Developer", link: "https://www.autodesk.com/products/alias-products/overview", img: "images/autodesk.png",
  desc: "Designed and implemented an execution control system for Alias in order to dynamically evade or delay executable code chunks at runtime. Contributed various improvements and bug fixes to better streamline the communication between Alias core and Qt. Improved the marking menu tool, making it compatible with upcoming versions of the software as apart of Alias's refactoring project", api_src: $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=Autodesk,Toronto&zoom=9&key=AIzaSyAmMXQiUtgnHPVW_M2h_zgbDYBAP2ySgpA")},
  {company: "Ford Motor Company", position: "Application Software Developer", link: "https://www.ford.ca/owners/technology/sync/", img: "images/ford.png",
  desc: "Designed multi-threaded C++ and C software to aid Projection services (CarPlay & Android Auto) for the Ford SYNC infotainment system, which will be deployed in most Ford vehicles within the next few years. Integrated echo cancellation features to be used during CarPlay with the use of QNX's Acoustic Management Platform. Modified and utilized the iOS CarPlay DevKit to better interact with Ford's applications.", api_src: $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=Rim+10,Waterloo&zoom=9&key=AIzaSyAmMXQiUtgnHPVW_M2h_zgbDYBAP2ySgpA")},
  {company: "Freshii", position: "Software Developer", link: "http://www.freshii.com/", img: "images/freshii.png",
  desc: "Designed and implemented all analytical metrics for Freshii's iOS, Android, and Web online ordering platforms. Built out dynamic and responsive content pages using Vue.js and the Prismic CMS. Created a Facebook chat bot for online ordering using Node.js, Express.js, and Google Dialogflow. Helped architect various CI/CD processes to accommodate Agile practices. Improved product management skills by overlooking and directing 3rd party contractors", api_src: $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=Freshii,Rosedale&zoom=7&key=AIzaSyAmMXQiUtgnHPVW_M2h_zgbDYBAP2ySgpA")},
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
