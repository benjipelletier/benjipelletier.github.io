var app = angular.module('mainApp',[]);

app.controller('mainCtrl', ['$scope', function($scope) {
	
	$scope.started = Math.floor((new Date() - new Date("02/27/15"))/86400000);
	$scope.year = $scope.started/365*100;
	$scope.ann = Math.floor((new Date("02/27/16") - new Date())/86400000);
	$scope.end = Math.floor((new Date("07/18/16") - new Date())/86400000);
	$scope.total = Math.floor((new Date("07/18/16") - new Date("02/27/15"))/86400000);
	$scope.love = ['HAPPY ANNIVERSARY MY LOVE. THANK YOU FOR EVERYTHING YOUVE DONE. THANK YOU FOR EVERYTHING TO COME. I LOVE YOU 👆🌙👇',
					'I love that whenever I look at you and you smile back (almost always, youre acutally doing it as we speak ;)) I melt',
					'I love how you always comfort me when I start crying. Those are the times when I most need you and I definitely get what I need',
					'01001001 00100000 01101100 01101111 01110110 01100101 00100000 01110111 01101000 01100101 01101110 00100000 01111001 01101111 01110101 00100000 01100100 01101111 01101110 00100111 01110100 00100000 01110100 01100101 01101100 01101100 00100000 01101101 01100101 00100000 01110011 01101111 01101101 01100101 01110100 01101000 01101001 01101110 01100111 00100000 01100010 01100101 01100011 01100001 01110101 01110011 01100101 00100000 01101001 01110100 00100000 01101001 01110011 00100000 01100001 00100000 01110011 01100101 01100011 01110010 01100101 01110100 00100000 01100001 01101110 01100100 00100000 01101101 01100001 01101011 01100101 00100000 01110100 01101000 01100001 01110100 00100000 01100011 01110101 01110100 01100101 00100000 01100110 01100001 01100011 01100101 00100000 01100011 01101111 01101110 01100011 01100101 01100001 01101100 01101001 01101110 01100111 00100000 01101001 01110100 00100000',
					'I love that you have always been so willing to help me, even when I am resistant and mean']
}]);

app.filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return null;
        return Math.round(input * 10) / 10;
    };
});



