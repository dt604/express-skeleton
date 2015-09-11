(function(){
	var ListingsCtrl = function($scope, $http){

		$scope.listing = {};

		$scope.postListing = function(){
			$http.post('/post-listing', $scope.listing).success(function(response){
				console.log(response);
			});
		};
	};//ListingsCtrl
	angular.module('myApp').controller('ListingsCtrl', ListingsCtrl);
}());