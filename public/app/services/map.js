(function(){
    
    'use strict';
    
    var MapService = function(){
        
       var Map = {
           
           getMap: function(address, map) {
                var geocoder;
                //var map;

                initialize(); 
               
                function initialize() {
                    geocoder = new google.maps.Geocoder();
                    codeAddress(address);    

                    


                } //initialize

                function codeAddress(address) {

                    geocoder.geocode( { 'address': address}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker(
                            {
                                map: map,
                                position: results[0].geometry.location
                            });
                        } else
                        {
                            alert("Geocode was not successful for the following reason: " + status);
                        }
                    });
                } //codeAdrress
           }//getMap
            
        };
        
        return Map;
        
    };
    
    angular.module('myApp').factory('Map', MapService);

}());