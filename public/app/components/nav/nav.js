(function(){
	var NavCtrl = function($scope, $rootScope, $location, Auth){


		//Menu Nav
		$scope.menu = {
			residential: 'Vacancies',
			about: 'About'
		};

		//$scope.defaultTitle = 'Vancouver Listings';

		//Get Page Title
		$scope.getTitle = function(pageTitle){
			return $rootScope.pageTitle = pageTitle;
		};
		//Login User
		$scope.login = function(user){
			Auth.login(user).success(function(response){
				//if login success
				if(user.password == response.password){
					
					// $rootScope.signedIn = true;
					$location.path('/admin/authUser');
					$('#login').modal('toggle');
				}else {
					console.log(response);
				}
			});
		};
		//Logout User
		$scope.logout = function(){
			$rootScope.signedIn = false;
		}

		//Register User
		$scope.register = function(user){
			Auth.register(user).success(function(response){
				$('#register').modal('toggle');
				//login in user
				Auth.login(user).success(function(response){
				//if login success
				if(user.password == response.password){
					$rootScope.signedIn = true;
					$location.path('/admin');
				}else {
					console.log(response);
				}
			});
			});
		};

		//Close Login Modal & Open Register Modal
		$scope.openRegister = function(){
			$('#login').modal('toggle');
			$('#register').modal('toggle');
		}
	}
	angular.module('myApp').controller('NavCtrl', NavCtrl);
}());