(function(){
	var AdminCtrl = function($scope, $rootScope, $routeParams, $location, Listings, Auth, usSpinnerService){
		
	
		
		// Initialize controller
		init();

		//Change Rent Function
		$scope.updateRent = function(buildID, aptID, idx, rent){
			usSpinnerService.spin('spinner-1');
			Listings.updateRent(buildID, aptID, idx, rent)
				.success(function(response){
					Listings.getBuildings().success(function(response){
						$scope.buildings = response;
						$location.path('/admin/authUser');
					});
				});
		};

		//Login Function
		$scope.login = function(user){
			//start spinner animation
			usSpinnerService.spin('spin-login');
			//login user
			Auth.login(user).success(function(response){
				$scope.emailErr = '';
				$scope.passErr = '';
				//if login success
				if(response == 'wrong email'){
					usSpinnerService.stop('spin-login');
					$scope.emailErr = 'No such email in the database!';
					return;
				}
				if(response == 'wrong password'){
					usSpinnerService.stop('spin-login');
					$scope.passErr = "You entered the wrong password";
					return;
				}
				
				usSpinnerService.stop('spin-login');
				$('#login').modal('toggle');
				$rootScope.signedIn = true;
				$location.path('/admin/');

				return;
				
					
		
			});
		};

		//if authUser is true --> signedIn = true
		if($routeParams.authUser == 'authUser'){
			$rootScope.signedIn = true;
		}


		//Put selected building to $scope
		if($routeParams.buildID){
			usSpinnerService.spin('spinner-1');

			var buildID = $routeParams.buildID;

			Listings.getBuilding(buildID).success(function(response){
				usSpinnerService.stop('spinner-1');
				$scope.building = response;
			});
		}
		

		//Set Listing Availability 'Yes/No'
		$scope.available = function(buildID, aptID, idx, available){
			usSpinnerService.spin('spinner-1');

			Listings.available(buildID, aptID, idx, available)
				.success(function(response){
					//usSpinnerService.stop('spinner-1');
					Listings.getBuildings().success(function(response){
						$scope.buildings = response;
						$location.path('/admin');
					});
					
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

		//Change Image Function
		$scope.changeImg = function(event){	
			usSpinnerService.spin('spin-gallery');
			
			event = event || window.event;
			var targetElement = event.target || event.srcElement;

			if(targetElement.tagName == 'IMG'){
				usSpinnerService.stop('spin-gallery');
				document.getElementById('main-img').src = targetElement.getAttribute('src');

			}
		};

		//Delete Building
		$scope.deleteBuilding = function(buildID){
			usSpinnerService.spin('spinner-1');

			Listings.deleteBuilding(buildID).success(function(response){
				Listings.getBuildings().success(function(response){
					$scope.buildings = response;
				});
			});
		};

		//Delete Listing
		$scope.deleteListing = function(buildID, aptID, idx, available){
			usSpinnerService.spin('spinner-1');
			Listings.deleteListing(buildID, aptID, idx, available)
				.success(function(response){
					Listings.getBuildings().success(function(response){
						$scope.buildings = response;
					});	
			});
		};

		function init(){
			usSpinnerService.spin('spinner-1');
			Listings.getBuildings().success(function(response){
				usSpinnerService.stop('spinner-1');
				$scope.buildings = response;
			});
		}

	}
	angular.module('myApp').controller('AdminCtrl', AdminCtrl);
}());