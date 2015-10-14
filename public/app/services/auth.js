(function(){
	var Auth = function($http){

		var Auth = {

			register: function(user){
				return $http.post('/register', user);
			},
			login: function(user){
				return $http.post('/login', user);
			}
		};

		return Auth;
	}
	angular.module('myApp').factory('Auth', Auth);
}());