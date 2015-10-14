(function(){
	var MainCtrl = function($scope, Listings){

		init();

		$scope.building = {};

		$scope.featured = [];

		//Get 'phots' for Photo Gallery modal
		$scope.getPhotos = function(buildID, index){
			
			Listings.getBuilding(buildID).success(function(response){
				$scope.building = response;
				$scope.aptIndex = index;
				$('#photo-gallery').modal('toggle');
			});
		};

		function init(){
			Listings.getBuildings().success(function(response){
				response.map(function(build, idx, arr){
					build.vacancies.map(function(apt, idx, arr){
						if(apt.feature){
							$scope.featured.push(apt);
						}
					});
				});
			});
		};
	}
	angular.module('myApp').controller('MainCtrl', MainCtrl);
}());