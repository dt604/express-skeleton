(function(){
	var AdminCtrl = function($scope, $rootScope, $routeParams, $location, Listings, Auth){
		
	
		
		// Initialize controller
		init();

		//Login User
		$scope.login = function(user){
			Auth.login(user).success(function(response){
				//if login success
				if(user.password == response.password){
					$('#login').modal('toggle');
					$rootScope.signedIn = true;
					$location.path('/admin/');
					
				}else {
					console.log(response);
				}
			});
		};

		//if authUser is true --> signedIn = true
		if($routeParams.authUser == 'authUser'){
			$rootScope.signedIn = true;
		}


		//Put selected building to $scope
		if($routeParams.buildID){
			var buildID = $routeParams.buildID;

			Listings.getBuilding(buildID).success(function(response){
				$scope.building = response;
			});
		}
		

		//Set Listing Availability 'Yes/No'
		$scope.available = function(buildID, aptID, idx, available){
			Listings.available(buildID, aptID, idx, available)
				.success(function(response){
					Listings.getBuildings().success(function(response){
						$scope.buildings = response;
						$location.path('/admin');
					});
					
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

		//Change Image Function
		$scope.changeImg = function(event){
			
			event = event || window.event;
			var targetElement = event.target || event.srcElement;

			if(targetElement.tagName == 'IMG'){
				
				document.getElementById('main-img').src = targetElement.getAttribute('src');

			}
		};

		//Delete Building
		$scope.deleteBuilding = function(buildID){
			Listings.deleteBuilding(buildID).success(function(response){
				Listings.getBuildings().success(function(response){
					$scope.buildings = response;
				});
			});
		};

		//Delete Listing
		$scope.deleteListing = function(buildID, aptID, idx, available){
			Listings.deleteListing(buildID, aptID, idx, available)
				.success(function(response){
					Listings.getBuildings().success(function(response){
						$scope.buildings = response;
					});	
			});
		};

		function init(){
			Listings.getBuildings().success(function(response){
				$scope.buildings = response;
			});
		}

	}
	angular.module('myApp').controller('AdminCtrl', AdminCtrl);
}());