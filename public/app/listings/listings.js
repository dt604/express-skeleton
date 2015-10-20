(function(){
	var ListingsCtrl = function($scope, $routeParams, $location, Listings, usSpinnerService){

		init();

		$scope.listing = {};
		$scope.building = {};
		$scope.buildings = [];

		//Initialize Controller
		function init(){
			Listings.getBuildings().success(function(response){
				$scope.buildings = response;
			})
		}
		

		if($routeParams.buildID){
			
			var buildID = $routeParams.buildID;

			Listings.getBuilding(buildID).success(function(response){
				//usSpinnerService.stop('spinner-1');
				if($routeParams.aptID && $routeParams.aptIDX){
					//get aptID for image upload
					$scope.aptID = $routeParams.aptID;
					$scope.aptIDX = $routeParams.aptIDX;
				}
				//put building to $scope
				$scope.building = response;
				$scope.listing.buildingID = response._id;
			});
		}

		//Get Availability
		$scope.getAvailable = function(avail){
			if(avail == 'yes'){
				$scope.listing.available = 'yes';
			}else{
				$scope.listing.available = false;
			}
		};

		//Post Building
		$scope.postBuilding = function(building){
			usSpinnerService.spin('spinner-1');

			if(building.streetNum && building.streetName && building.city){
		  		
		  		var address = getAddress();

		  		var geocoder = new google.maps.Geocoder();
		  		geocoder.geocode({ 'address': address }, function(results, status){
		  			if(status == google.maps.GeocoderStatus.OK) {
		  				$scope.building.lat = results[0].geometry.location.lat();
		  				$scope.building.lng = results[0].geometry.location.lng();

		  				Listings.postBuilding(building).success(function(response){
		  					usSpinnerService.stop('spinner-1');
							$location.path('/building-upload/' + response._id);
						});
		  			}
		  		});

		  		
		  	}

		  	

			
		};
		//Post Listing
		$scope.postListing = function(listing){
			usSpinnerService.spin('spinner-1');
			Listings.postListing(listing).success(function(response){
				usSpinnerService.stop('spinner-1');
				$location.path('/admin/authUser');
			});
		};

		//Get Address
		function getAddress(){
			$scope.building.address = 
			($scope.building.streetNum + " " + $scope.building.streetName + 
				" " + $scope.building.city + " BC");

			return $scope.building.address;
		}
		//Edit Building
		$scope.editBuilding = function(building){

			if(building.streetNum && building.streetName && building.city){
		  		
		  		var address = getAddress();

		  		var geocoder = new google.maps.Geocoder();
		  		geocoder.geocode({ 'address': address }, function(results, status){
		  			if(status == google.maps.GeocoderStatus.OK) {
		  				$scope.building.lat = results[0].geometry.location.lat();
		  				$scope.building.lng = results[0].geometry.location.lng();

		  				Listings.editBuilding(building)
							.success(function(response){
								$location.path('/building-upload/' + building._id);
							});
		  			}
		  		});

		  		
		  	}

			
				
		};

		//Change Image Function
		$scope.changeImg = function(event){
			
			event = event || window.event;
			var targetElement = event.target || event.srcElement;

			if(targetElement.tagName == 'IMG'){
				
				document.getElementById('main-img').src = targetElement.getAttribute('src');

			}
		};

		//Upload Image
		$('#imgInp').change(function(){
			usSpinnerService.spin('spinner-1');
			//readURL(this);
			$('#imgUpload').submit();
		});

		//Delete Image
		$scope.deleteImg = function(index){
			
			var buildID = $scope.building._id;
			var imgIndex = index;

			$http.get('/img/' + buildID + '/' + index).success(function(response){
				$scope.building.imgFiles = response.imgFiles;
			});
		 };

		 //Read Image for upload
		function readURL(input) {

			var files = input.files;
			var imageType = /image.*/;

			if(files && files[0]) {
				var fileDisplayArea = document.getElementById('fileDisplayArea');
				//fileDisplayArea.innerHTML = '';
				var imageType = /image.*/;

				for(var i=0; i<files.length; i++){
					var file = files[i];


					if(file.type.match(imageType)){
						var reader = new FileReader();
						reader.onload = function(e){
							var img = new Image();
							img.className = 'tn';
							img.src = e.target.result;
							fileDisplayArea.appendChild(img);
						}
						reader.readAsDataURL(file);
					}else{
						alert(file.name + ' is not valid image file.');
						fileDisplayArea.innerHTML = '';
						return false;
					}
				}
			}else{
				alert('This browser does not support HTML5 FileReader');
			}


		}//readURL

		
	}
	angular.module('myApp').controller('ListingsCtrl', ListingsCtrl);
}());