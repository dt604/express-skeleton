
var mongoose = require('mongoose');

var buildingsSchema = mongoose.Schema({

	name 		 : String,
	rentalType 	 : Object,
	utils 		 : Object,
	amens		 : Object,
	address 	 : String,
	streetNum 	 : String,
	streetName 	 : String,
	postal 		 : String,
	city 		 : String,
	community 	 : String,
	lat			 : String,
	lng			 : String,
	description  : String,
	imgFiles 	 : [],


	units 		 : [{
					aptNum		: 	 String,
					feature	    :  	 Boolean, 
					rentalType  : 	 Object,
					available	:  	 String,
					buildingID	: 	 String, //building name

					bedrooms 	: 	 String,
					ft2	 		: 	 String,
					rentAmt 	: 	 String,
					imgFiles 	: 	 []
					}],

	vacancies 	 : [{
					aptNum		: 	 String,
					feature	 	: 	 Boolean, 
					rentalType  : 	 Object,
					available	:  	 String,
					buildingID	: 	 String, //building name

					bedrooms 	: 	 String,
					ft2	 		: 	 String,
					rentAmt 	: 	 String,
					imgFiles 	: 	 []
					}]

});




module.exports = mongoose.model('Buildings', buildingsSchema);
