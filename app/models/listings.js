var mongoose = require('mongoose');

var listingsSchema = mongoose.Schema({

	rentalType 	: 	 String, //commercial/residential
	available 	: 	 String, 
	buildingID	: 	 String, //building name

	aptNum 		: 	 String,
	bedrooms 	: 	 String,
	ft2	 		: 	 String,
	rentAmt 	: 	 String,
	imgFiles 	: 	 []

	




});

module.exports = mongoose.model('Listings', listingsSchema);