(function(){
	angular.module('myApp', ['ngRoute'])
		.config(function($routeProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'app/main/main.html',
					controller: 'MainCtrl'
				})
				.when('/post-listing', {
					templateUrl: 'app/listings/post-listing.html',
					controller: 'ListingsCtrl'
				})
				.otherwise({ redirectTo: '/' });
		});
}());