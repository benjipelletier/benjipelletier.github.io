
var app = angular.module('regressionApp', []);
app.controller('Ctrl', function($scope) {

	$scope.Math = window.Math;
    $scope.points = [];
    $scope.pointsLength = [[0, 0]]
    $scope.corCoef;

    $scope.removePoints = function() {
    	$scope.points = [];
    	$scope.pointsLength = [[0, 0]];
    	$scope.regression = undefined;
    	$scope.corCoef = undefined;
    	drawBasic();
    }

    $scope.updatePoints = function(index, x, y) {
    	if (x.length && y.length) {
    		$scope.points[index] = [];
    		$scope.points[index][0] = parseInt(x);
    		$scope.points[index][1] = parseInt(y);
    		if ($scope.pointsLength.length - 1 == index) {
            	$scope.pointsLength.push([0,0]);
            }
    	} else if (!x.length && !y.length) {

            	$scope.points.splice(index, 1);
            	$scope.pointsLength.splice(index, 1);
       }
	       
       if ($scope.points.length > 1) {
	       $scope.regression = findRegression(0, 0);
	       getCorCoef();
	   }
       drawBasic();
    }

    function getCorCoef() {
    	$scope.tempSet = [];
    	var sumXY = 0;
    	var sumX2 = 0;
    	var sumY2 = 0;
    	var r, xMean = 0, yMean = 0;
    	for (var i = 0; i < $scope.points.length; i++) {
    		$scope.tempSet.push([$scope.points[i][0], $scope.points[i][1]]);
    		sumXY += $scope.tempSet[i][0]*$scope.tempSet[i][1];
    		sumX2 += Math.pow($scope.tempSet[i][0], 2);
    		sumY2 += Math.pow($scope.tempSet[i][1], 2);
    		xMean += $scope.tempSet[i][0];
    		yMean += $scope.tempSet[i][1];
    	}
    	xMean /= $scope.tempSet.length;
    	yMean /= $scope.tempSet.length;
    	r = (sumXY - $scope.tempSet.length*xMean*yMean)/(Math.sqrt(sumX2-$scope.tempSet.length*Math.pow(xMean, 2))*(Math.sqrt(sumY2-$scope.tempSet.length*Math.pow(yMean, 2))));
    	$scope.corCoef = r;
    } 

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBasic);

	function drawBasic() {
		$scope.finalPoints = [];
		if ($scope.points.length) {
			var maxPoint = $scope.points[0][0];
			var maxPointIndex = 0;
			var minPoint = $scope.points[0][0];
			var minPointIndex = 0;
			var hasZero = false;
			  for (var i = 0; i < $scope.points.length; i++) {
			  	if ($scope.points[i][0] > maxPoint) {
			  		maxPoint = $scope.points[i][0];
			  		maxPointIndex = i;
			  	} else if ($scope.points[i][0] < minPoint) {
			  		minPoint = $scope.points[i][0];
			  		minPointIndex = i;
			  	}
			  	$scope.finalPoints.push([$scope.points[i][0], $scope.points[i][1], null]);  
			  }

	    if (minPoint > 0) {

	    	$scope.finalPoints.push([0, null, hyp($scope.regression[0], 0, $scope.regression[1])]);
	    	
	    } else {
	    	$scope.finalPoints[minPointIndex][2] = hyp($scope.regression[0], $scope.points[minPointIndex][0], $scope.regression[1]);
	    }
		
		$scope.finalPoints[maxPointIndex][2] = hyp($scope.regression[0], $scope.points[maxPointIndex][0], $scope.regression[1]);
		}


		

	      var data = new google.visualization.DataTable();
	      data.addColumn('number', 'X Axis');
	      data.addColumn('number', 'Point');
	      data.addColumn('number', 'Equation');
	      data.addRows($scope.finalPoints);

	      var options = {
	        hAxis: {
	          title: 'X Axis',
	          minValue: 0
	        },
	        vAxis: {
	          title: 'Y Axis',
	          minValue: 0
	        },
	        legend: 'none',
	        series: {
	        	0: { lineWidth: 0,
	        		  pointSize: 7 },
	            1: { lineWidth: 2 }
			},
			interpolateNulls: true
	   
	      };

	      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

	      chart.draw(data, options);
	}



	function hyp(m, x, b) {
		return m*x + b;
	}

	function cost(m, p) {
		var sum = 0;
		for (var i = 0; i < p.length; i++) {
			sum += Math.pow((hyp(m, p[i][0]) - p[i][1]), 2);
		}
		return sum;
	}

	//partial derivative in terms of m
	function costDerivM(m, b, p) {
		var sum = 0;
		for (var i = 0; i < p.length; i++) {
			sum += 2*(hyp(m, p[i][0], b) - p[i][1])*p[i][0];
		}
		return sum;
	}
	//double partial derivative in terms of m
	function costDoubleDerivM(m, b, p) {
		var sum = 0;
		for (var i = 0; i < p.length; i++) {
			sum += 2*Math.pow(p[i][0], 2);
		}
		return sum;
	}

	//partial derivative of b
	function costDerivB(m, b, p) {
		var sum = 0;
		for (var i = 0; i < p.length; i++) {
			sum += 2*(hyp(m, p[i][0], b) - p[i][1]);
		}
		return sum;
	}

	//double partial derivative in terms of b
	function costDoubleDerivB(m, b, p) {
		var sum = 0;
		for (var i = 0; i < p.length; i++) {
			sum += 2;
		}
		return sum;
	}
	//Solve for m
	function findSlope(start, b) {
		var deriv = costDerivM(start, b, $scope.points);
		if (deriv < -0.0001 || deriv > 0.0001) {
			//console.log(start, deriv);
			return findSlope(start - 0.0001*deriv, b);
		} else {
			return start;
		}
		
	}
	//solve for m
	function findSlopeNewton(start, b) {
		var deriv = costDerivM(start, b, $scope.points);
		var deriv2 = costDoubleDerivM(start, b, $scope.points);
		if (deriv < -0.0001 || deriv > 0.0001) {
			//console.log(start, deriv/deriv2);
			return findSlopeNewton(start - deriv/deriv2, b);
		} else {
			return start;
		}
		
	}

	//solve for b
	function findIntercept(start, b) {
		var deriv = costDerivB(start, b, $scope.points);
		if (deriv < -0.0001 || deriv > 0.0001) {
			//console.log(b, deriv);
			return findIntercept(start, b - 0.001*deriv);
		} else {
			return b;
		}
		
	}
	//solve for b
	function findInterceptNewton(start, b) {
		var deriv = costDerivB(start, b, $scope.points);
		var deriv2 = costDoubleDerivB(start, b, $scope.points);
		if (deriv < -0.0001 || deriv > 0.0001) {
			//console.log(b, deriv/deriv2);
			return findInterceptNewton(start, b - deriv/deriv2);
		} else {
			return b;
		}
		
	}

	function findRegression(m, b){
		if (findSlopeNewton(m, findInterceptNewton(m, b)) == m && findInterceptNewton(findSlopeNewton(m, b), b) == b) {
			return [m, b];
		} else {

			var tempM = findSlopeNewton(m, b);
			var tempB = findInterceptNewton(tempM, b);
			//console.log(tempM, tempB);
			return findRegression(tempM,tempB);
		}
		
	}

});



// var finalPoints = [];

// function hyp(m, b) {
// 	return m*b;
// }


/*

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X Axis');
      data.addColumn('number', 'Point');
      data.addColumn('number', 'slope');

      data.addRows([
        $scope.points
      ]);

      var options = {
        hAxis: {
          title: 'X Axis'
        },
        vAxis: {
          title: 'Y Axis'
        },
        lineWidth: 0,
        $scope.pointsize: 2,
        legend: 'none',
        series: {
            1: { lineWidth: 1 },
		},
		interpolateNulls: true
   
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
    */