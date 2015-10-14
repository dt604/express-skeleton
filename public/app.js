(function(){
	angular.module('myApp', ['ngRoute', 'angular.filter', 'ui.bootstrap', 'ngMap', 'ngMask'])
		.config(function($routeProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'app/main/main.html',
					controller: 'MainCtrl'
				})
				//Browse Residential Listings
				.when('/residential', {
					templateUrl: 'app/browse/residential.html',
					controller: 'BrowseCtrl'
				})
				.when('/commercial', {
					templateUrl: 'app/browse/commercial.html',
					controller: 'BrowseCtrl'
				})
				.when('/building/:buildID', {
					templateUrl: 'app/browse/building-details.html',
					controller: 'BrowseCtrl'
				})
				.when('/community/:community', {
					templateUrl: 'app/browse/building-search.html',
					controller: 'BrowseCtrl'
				})
				//Edit
				.when('/admin/', {
					templateUrl: 'app/admin/admin.html',
					controller: 'AdminCtrl'
				})
				.when('/admin/:authUser', {
					templateUrl: 'app/admin/admin.html',
					controller: 'AdminCtrl'
				})
				//Post Building & Listing
				.when('/post-building', {
					templateUrl: 'app/listings/post-building.html',
					controller: 'ListingsCtrl'
				})
				.when('/post-listing/:buildID', {
					templateUrl: 'app/listings/post-listing.html',
					controller: 'ListingsCtrl'
				})
				.when('/preview/:buildID', {
					templateUrl: 'app/admin/preview.html',
					controller: 'AdminCtrl'
				})
				//Edit Building
				.when('/edit-building/:buildID', {
					templateUrl: 'app/listings/edit-building.html',
					controller: 'ListingsCtrl'
				})
				//Edit Listing
				.when('/edit-listing/:buildID/:aptID', {
					templateUrl: 'app/listings/edit-listing.html',
					controller: 'ListingsCtrl'
				})
				//Uploads
				.when('/listing-upload/:buildID/:aptID/:aptIDX', {
					templateUrl: 'app/listings/listing-upload.html',
					controller: 'ListingsCtrl'
				})
				.when('/building-upload/:buildID', {
					templateUrl: 'app/listings/building-upload.html',
					controller: 'ListingsCtrl'
				})
				.otherwise({ redirectTo: '/' });
		});
}());