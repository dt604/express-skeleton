(function(){

	var BrowseCtrl = function($scope, $routeParams, Listings){

		$scope.searchBuild = true;
			

		$scope.buildings =[];	

		if($routeParams.community){
			var community = $routeParams.community;

			Listings.getBuildings().success(function(response){
				response.map(function(build, idx, arr){
					if(build.community == community){

						 $scope.buildings.push(build);
						 return;
					}
				});
				if(!$scope.buildings[0]){
					$scope.searchBuild = false;
				}
			});
		} else {

			init();
		}

		$scope.selected = 'gallery';

		$('.tab.map').on('click', function(){
			$scope.$broadcast('getMap');
		});

		function init(){
			Listings.getBuildings().success(function(response){
				$scope.buildings = response;
			})
		}

		if($routeParams.buildID){
			var buildID = $routeParams.buildID;

			Listings.getBuilding(buildID).success(function(response){
				$scope.building = response;
			});
		}

		//Get 'phots' for Photo Gallery modal
		$scope.getPhotos = function(buildID, index){
			
			Listings.getBuilding(buildID).success(function(response){
				$scope.building = response;
				$scope.aptIndex = index;
				$('#photo-gallery').modal('toggle');
			});
		};



	};

	angular.module('myApp').controller('BrowseCtrl', BrowseCtrl);
}());