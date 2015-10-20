(function(){
	var User = function($http){
		var User = {

			postSchedule: function(buildName, user){
				return $http.post('/viewing/' + buildName, user);
			}
		};

		return User;
	}

	angular.module('myApp').factory('User', User);
}());