"use strict";

class SearchBox{

   constructor(mapObj, inputId, newFountainMarker, addFountainSearchBox){
      //
      //    https://developers.google.com/maps/documentation/javascript/places-autocomplete
      //    Recherche avec input : https://developers.google.com/maps/documentation/javascript/places?hl=fr
      //
      this.map = mapObj;
      this.input = document.getElementById(inputId);
      this.autocomplete = new google.maps.places.Autocomplete(this.input);
      this.autocomplete.bindTo('bounds', mapObj);
      this.marker = newFountainMarker;
      this.addFountainSearchBox = addFountainSearchBox;
      this.placeChanged();
      this.placeStarterMarker();
   }

   placeStarterMarker(){
      var that = this;
      if(!this.addFountainSearchBox){
         this.marker = new google.maps.Marker({
            map: that.map,
            position: new google.maps.LatLng($("#latitude").val(), $("#longitude").val()),
            icon: "./img/currentPositionMarker.png"
         });
         this.marker.setVisible(true);
      }
   }

   placeChanged(){
      var that = this;
      this.autocomplete.addListener('place_changed', function(e) {
         var place = that.autocomplete.getPlace();

         if (!place.geometry) {
            if(that.input.value != ""){
               // parcours l'objet autocomplete et récupère l'adresse de la première position conseillée
               var b = that.autocomplete.gm_bindings_.bounds;
               var addressInput = "";
               for(var propName in b) {
                  if(b.hasOwnProperty(propName)) {
                     for(var propName2 in b[propName]) {
                        if(b[propName].hasOwnProperty(propName2)) {
                           for(var propName3 in b[propName][propName2]) {
                              if(propName3 == "m"){
                                 var addresses = b[propName][propName2][propName3];
                                 if(addresses.length > 0){
                                    addressInput = addresses[0]["data"][0];
                                 }
                              }
                           }
                        }
                     }
                  }
               }
               var geocoder = new google.maps.Geocoder();
               geocoder.geocode({'address': addressInput}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                     if(!that.addFountainSearchBox){
                        var location = results[0].geometry.location;
                        $("#latitude").val(location.lat());
                        $("#longitude").val(location.lng());
                     }
                     that.input.value = results[0].formatted_address;
                     that.map.setCenter(results[0].geometry.location);
                     that.marker.setPosition(results[0].geometry.location);
                     that.map.setZoom(16);
                  }
               });
            }
         }else{
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
               that.map.fitBounds(place.geometry.viewport);
            } else {
               that.map.setCenter(place.geometry.location);
               that.map.setZoom(16);
            }
            that.marker.setPosition(place.geometry.location);
         }

         that.marker.setVisible(true);
      });
      this.autocomplete.setTypes(['geocode']);
   }
}
