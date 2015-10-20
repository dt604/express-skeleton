(function(){
	var FormCtrl = function($scope, $http, $routeParams, Listings, usSpinnerService){

		$scope.user = {};
		$scope.buildings = [];
		$scope.building = {};

		init();

		if($routeParams.buildID){
			usSpinnerService.spin('spinner-1');
			var buildID = $routeParams.buildID;

			Listings.getBuilding(buildID).success(function(response){
				usSpinnerService.stop('spinner-1');
				$scope.building = response;
				$scope.user.building = response.name;
			});
		}

		function init(){
			Listings.getBuildings().success(function(response){
				$scope.buildings = response;
			});
		};

		$scope.setBuilding = function(buildID){
			$http.get('/buildByName/' + buildID).success(function(response){
				$scope.building = response;
			});
		};

		$scope.postContact = function(user){
			usSpinnerService.spin('spin-contact');
			$http.post('/contact', user).success(function(response){
				if(response){
					usSpinnerService.stop('spin-contact');
					$('#contact-form').modal('toggle');
				}
			});
		};

		$scope.postApplication = function(user){
			$http.post('/application', user).success(function(response){
				console.log(response);
			});
		};

	};

	angular.module('myApp').controller('FormCtrl', FormCtrl);
}());