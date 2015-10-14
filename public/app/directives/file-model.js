angular.module('myApp').directive('fileModel', function($parse){


	// return {
 //        scope: {
 //            file: '='
 //        },
 //        link: function(scope, el, attrs){
 //            el.bind('change', function(event){
 //                var files = event.target.files;
 //                var file = files[0];
 //                scope.file = file ? file.name : undefined;
 //                scope.$apply();
 //            });
                
 //        }
 //    };



	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;


			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element.files);
				});
			})
		}
	}
});