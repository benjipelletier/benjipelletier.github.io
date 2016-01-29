var app = angular.module('mainApp',[]);

app.controller('mainCtrl', ['$scope', function($scope) {
	$scope.shootingList = [];

	$scope.killed;
	$scope.injured;
	$scope.days;
	$scope.mostCommonDate;
	$scope.mostCommonDateAmount;
	$scope.mostCommonDay;
	$scope.mostCommonDayAmount;
	$scope.mostCommonMonth;
	$scope.mostCommonMonthAmount;

	var weekday = [];
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var month = [];
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";

	$scope.loading = true;
	$scope.initMain = function() {
		$scope.loading = true;
		$scope.shootingList = [];
		var results = [];
		$.getJSON( "https://api.import.io/store/connector/665e7d99-5ffb-4cd4-b499-f86916b268dd/_query?input=webpage/url:http%3A%2F%2Fshootingtracker.com%2Fwiki%2FMass_Shootings_in_2015&&_apikey=8230fa7d32ce413381e500f6be8084b7a5654e2d7cb0781632c3e309d55e07bde3344696578bc0af10f3f2308b1eea0a5eff81a8d732c6c2766bb68f8d560ec2b48484dba2b5a82a5482f35d484b89a9", function( data ) {
			if(data.results != undefined){
		  	  $scope.loading = false;
			  results = data.results;

			  for (var i in results) {
			  	$scope.shootingList.push({date: results[i].value_1, shooter: results[i].value_2, killed: results[i].number_2, injured: results[i].number_3, city: results[i].value_3});
			  }

			  $scope.killed = getSum($scope.shootingList, "killed");
			  $scope.injured = getSum($scope.shootingList, "injured");
			  var jan16 = new Date("1/1/2016");
			  var curr = new Date();

			  if(curr-jan16 >= 0) {
			  	var now = new Date("1/1/2016");
			  } else {
			  	var now = curr;
			  }
			  
			  var jan15 = new Date("1/1/2015");
			  $scope.days = Math.floor((now-jan15)/8.64e7);
			  $scope.mostCommonDate = getCommonDate($scope.shootingList, "date", "date")[0];
			  $scope.mostCommonDateAmount = getCommonDate($scope.shootingList, "date", "date")[1];
			  $scope.mostCommonDay = weekday[getCommonDate($scope.shootingList, "date", "day")[0]];
			  $scope.mostCommonDayAmount = getCommonDate($scope.shootingList, "date", "day")[1];
			  $scope.mostCommonMonth = month[getCommonDate($scope.shootingList, "date", "month")[0]];
			  $scope.mostCommonMonthAmount = getCommonDate($scope.shootingList, "date", "month")[1];
			  $scope.$apply();

			  drawStateMap();
			  drawCityMap();
			  } else{
				$scope.initMain();
			  }

		});


	}

	function getCommonDate(list, property, week) {
		if (week == "day") {
			var newList = listOfDays(list, property);
		} else if (week == "date"){
			var newList = listOfDates(list, property);
		} else {
			var newList = listOfMonths(list, property);
		}
		var freq = {};
		var max
		for (var i in newList) {
		  if (freq[String(newList[i])]) {
           freq[String(newList[i])]++;
          } else {
           freq[String(newList[i])] = 1;
          } 
		}

		var max = 0;
		var day;
		for (var k in freq) {
			if (freq[k] > max) {
				max = freq[k];
				day = k;
			} 
		}
		return [day, max];
	}

	function listOfDates(list, property) {
		var newList = [];
		for (var i in list) {
			newList.push(new Date(list[i][property]).getDate());
		}
		return newList;
	}

	function listOfDays(list, property) {
		var newList = [];
		for (var i in list) {
			newList.push(new Date(list[i][property]).getDay());
		}
		return newList;
	}

	function listOfMonths(list, property) {
		var newList = [];
		for (var i in list) {
			newList.push(new Date(list[i][property]).getMonth());
		}
		return newList;
	}

	function getSum(list, property) {
		var sum = 0;
		for (var i in list) {
			sum += list[i][property];
		}
		return sum;
	}

	function getShootingStateAmount(list, property) {
		var freq = {};
		for (var i in list) {
		  if (freq[list[i][property].substring(list[i][property].length-2).toUpperCase()]) {
           freq[list[i][property].substring(list[i][property].length-2).toUpperCase()]++;
          } else {
           freq[list[i][property].substring(list[i][property].length-2).toUpperCase()] = 1;
          } 
		}
		return freq;
	}



	function getShootingCityAmount(list, property) {
		var freq = {};
		for (var i in list) {
		  if (freq[list[i][property].substring(0,list[i][property].length-4)]) {
           freq[list[i][property].substring(0,list[i][property].length-4)]++;
          } else {
           freq[list[i][property].substring(0,list[i][property].length-4)] = 1;
          } 
		}
		return freq;
	}


      function drawStateMap() {

		var dataList = [];
		var locations = getShootingStateAmount($scope.shootingList, "city");
		for(var key in locations) {
			dataList.push(['US-' + key, locations[key]]);
		}


        var data = new google.visualization.DataTable();

        data.addColumn('string', 'State');
		data.addColumn('number', 'Mass Shootings');

		data.addRows(dataList);

        var options = {
	        region: 'US',
	        resolution: 'provinces',
	        colorAxis: {colors:[ '#fff5f5','#750000']}
	        
        };

        var chart = new google.visualization.GeoChart(document.getElementById('state_map'));

        chart.draw(data, options);
      }

      function drawCityMap() {

		var dataList = [];
		var locations = getShootingCityAmount($scope.shootingList, "city");
		for(var key in locations) {
			dataList.push([key, locations[key]]);
		}

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'City');
		data.addColumn('number', 'Mass Shootings');

		data.addRows(dataList);

        var options = {
	        region: 'US',
	        resolution: "metros",
	        displayMode: 'markers',
	       	colorAxis: {colors:[ '#DB2929','#330000']},
	       	magnifyingGlass: {enable: true, zoomFactor: 7.5}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('city_map'));

        chart.draw(data, options);
      }

      $(window).resize(function(){
   		drawCityMap();
   		drawStateMap();
	  });


}]);

app.filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return null;
        return Math.round(input * 10) / 10;
    };
});



