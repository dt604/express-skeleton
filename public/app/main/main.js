(function(){
	var MainCtrl = function($scope, Listings, usSpinnerService){

		init();

		

		$scope.featured = [];
		

		//Get 'phots' for Photo Gallery modal
		$scope.getPhotos = function(buildID, index){
			usSpinnerService.spin('spinner-1');

			

			Listings.getBuilding(buildID).success(function(response){
				$scope.building = response;

				$scope.selectedApt = $scope.featured[index];

				
				usSpinnerService.stop('spinner-1');
				$('#photo-gallery').modal('toggle');

				return $scope.selectedApt;
			});
		};

		function init(){
			Listings.getBuildings().success(function(response){
				response.map(function(build, idx, arr){
					build.units.map(function(apt, idx, arr){
						if(apt.feature == 'yes' && apt.available == 'yes'){
							$scope.featured.push(apt);
						}
					});
				});
			});
		};
	}
	angular.module('myApp').controller('MainCtrl', MainCtrl);
}());