(function(){
	var MainCtrl = function($scope){
		$scope.message = 'Welcome to your MEAN app';
	}
	angular.module('myApp').controller('MainCtrl', MainCtrl);
}());