(function(){

	var BrowseCtrl = function($scope, $routeParams, Listings, usSpinnerService, User){

		$scope.searchBuild = true;
		$scope.user = {};
			

		$scope.buildings =[];	

		if($routeParams.community){
			usSpinnerService.spin('spinner-1');
			var community = $routeParams.community;

			Listings.getBuildings().success(function(response){
				response.map(function(build, idx, arr){
					if(build.community == community){
						 usSpinnerService.stop('spinner-1');
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
			usSpinnerService.spin('spinner-1');
			Listings.getBuilding(buildID).success(function(response){
				$scope.building = response;
				$scope.aptIndex = index;
				usSpinnerService.stop('spinner-1');
				$('#photo-gallery').modal('toggle');
			});
		};

		//Post Schedule Function for Viewing
		$scope.postSchedule = function(buildName, user){
			usSpinnerService.spin('spinner-1');
			// $http.post('/viewing/' + buildName, user)
			// 	.success(function(response){
			// 		usSpinnerService.stop('spinner-1');
			// 		$('#schedule-form').modal('toggle');

			// 	});

			User.postSchedule(buildName, user).success(function(response){
				usSpinnerService.stop('spinner-1');
				$('#schedule-form').modal('toggle');

			});
		};



	};

	angular.module('myApp').controller('BrowseCtrl', BrowseCtrl);
}());