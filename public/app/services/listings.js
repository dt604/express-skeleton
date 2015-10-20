(function(){
	var Listings = function($http){

		var Listings = {

			postBuilding: function(building){
				return $http.post('/post-building', building);
			},
			getBuildings: function(){
				return $http.get('/buildings');
			},
			getBuilding: function(buildID){
				return $http.get('/building/' + buildID);
			},
			editBuilding: function(building){
				return $http.post('/edit-building/' + building._id, building);
			},
			deleteBuilding: function(buildID){
				return $http.get('/delete-building/' + buildID);
			},
			available: function(buildID, aptID, idx, available){
				return $http.get('/available/' + buildID + '/' + aptID + '/' 
							+ idx + '/' + available);
			},
			updateRent: function(buildID, aptID, idx, rent){
				return $http.get('/updateUnit/' + buildID + '/' + aptID + '/'
							+ idx + '/' + rent);
			},
			postListing: function(listing){
				return $http.post('/post-listing/' + listing.buildingID + '/' 
							+ listing.available, listing);
			},
			deleteListing: function(buildID, aptID, idx, available){
				return $http.get('delete-listing/' + buildID + '/' + aptID + '/' 
							+ idx + '/' + available);
			}

		}

		return Listings;
	}

	angular.module('myApp').factory('Listings', Listings);
}())