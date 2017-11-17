/*
* Object GeSoifMap used to manage functions relative to the map of fontains
*
* Authors :
* v1 : Antonio Pisanello, Robin Plojoux
* v2 : Gabriel Strano, Nohan Budry, Yohann Perez, Jasmina Travnjak
* v3 : Simon Fanetti, Raphael Silva, Ramushi Ardi
*/

"use strict";

class GeSoifMap {
	constructor(mapCanvasId, position, itineraryTimeId, itineraryKmId) {
		this.mapCanvas = $("#" + mapCanvasId)[0];
	    this.itineraryKm = $("#" + itineraryKmId);
	    this.itineraryTime = $("#" + itineraryTimeId);
	    this.toggleAddFontaine = true;
	    this.map = null;
	    this.currentPosition = position; //réfléchir à un timer qui recalcule la position, car si la personne bouge ça va pas!
	    this.currentPositionIcon = "./img/currentPositionMarker.png";
	    this.existingfountainMarker = "./img/geSoifExistingMarker.png";
	    this.fountainMarkers = new Array();
	    this.loadedFountains = new Array();
	    this.swLat = null;
	    this.swLng = null;
	    this.neLat = null;
	    this.neLng = null;
	    this.directionsDisplay = new google.maps.DirectionsRenderer();
	    this.directionsService = new google.maps.DirectionsService();
	    this.searchedPosAdviced = null;
	    this.mapOptions = null;
	    this.newMarker = null;
	    this.addMode = false;
	    this.mapCenterChanged = false;

		$("#longitude").val(position.lng());
		$("#latitude").val(position.lat());
		this.initMapWithCurrentPos();
		this.directionsDisplay.setMap(this.map);

		var that = this;

		//add idle listener when the map is loaded for the first time and trigger the zoom_changed in order to get the borders and load fountains inbetween these borders
		google.maps.event.addListenerOnce(this.map, 'idle', function () {
			google.maps.event.trigger(that.map, "zoom_changed");
		});

		this.map.addListener('center_changed', function () {
			that.mapCenterChanged = true;
		});

		//add click listener on map to allow users to add a new fountain
		this.map.addListener("click", function (event) {
			if (that.addMode) {
				that.addNewMarkerToMap(event.latLng);
				that.selectPos(event.latLng);
				$('#actualPos').attr("src", "./img/Ge-Soif-Glyphicons/LocationOFF.png");
			}			
			$('#slide').stop(true);
			$("#slide").animate({left: '-100%'}, 300);
		});

		$("html").on('mouseup', function (e) {
			if(that.mapCenterChanged){
				that.mapCenterChanged = false;
				setTimeout(function(){ that.updateMapBorders();}, 1);
			}
		});
    }

    initMapWithCurrentPos() {
		var that = this;
		this.mapOptions = {
			center: new google.maps.LatLng($("#latitude").val(), $("#longitude").val()),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			fullscreenControl: false,
			minZoom: 3
		};

		this.map = new google.maps.Map(this.mapCanvas, this.mapOptions);
		this.map.addListener('zoom_changed', function () {
			that.mapCenterChanged = false;
			that.updateMapBorders();//TODO pk ça marche pas sans le event listener zoom
		});

		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById("inputSearchLocation"));
		this.addNewMarkerToMap(new google.maps.LatLng($("#latitude").val(), $("#longitude").val()));

		var searchBoxMap = new SearchBox(this.map, "inputSearchLocation", null, false);
		var searchBoxAddFountain = new SearchBox(this.map, "address", this.newMarker, true);
    }
    createMarker(markerPosition, markerIcon) {
		var that = this;
		var marker = new google.maps.Marker({
			map: that.map,
			position: markerPosition,
			icon: markerIcon,
			zIndex: 500
		});
		return marker;
    }

    loadFountainsAroundMe() {
		var that = this;
		$.post('./pages/ajaxCall.php',
		{
			getFountains: true,
			swLat: that.swLat,
			swLng: that.swLng,
			neLat: that.neLat,
			neLng: that.neLng
		},
		function (data) {
			that.removeMarker();
			that.loadedFountains = JSON.parse(data);
			$("#nb_fontaines").text("Nombre de fontaines autour de vous : " + that.loadedFountains.length);
			that.showFountainsAroundMe();
		});
	}

    removeMarker() {
		for (var i = 0; i < this.fountainMarkers.length; i++) {
			var marker = this.fountainMarkers[i];
			marker.setMap(null);
		}
		this.loadedFountains = null;
	}

    showFountainsAroundMe() {
		var that = this;
		that.fountainMarkers = new Array();
		$.each(this.loadedFountains, function (index, value) {
			var fountainPos = new google.maps.LatLng(value.latitude, value.longitude);
			var existingFountainMarker = that.createMarker(fountainPos, that.existingfountainMarker);
			google.maps.event.addListener(existingFountainMarker, 'click', function () {
				var titre = '<h5 class="smallMargin">' + value.title + '</h5>';
				var image = '<img class="img-fluid img-fountain" src=".\\img\\fountains\\' + value.img + '" style="height:40px; text-align: center;"/>';
				var adresse = '<p style="border-bottom: gray solid 2px; padding-bottom: 20px; padding-top: 20px;">' + value.address + '</p>';
				var itinieraryBtn = '<img id="btnItinerary" src="./img/directions.png"/>';
				var olpb = value.olpb;
				var nbClick = '<span id="nbClicked_' + value.idFountain + '" class="m-r-5">Au total <strong><span id="olpb_val">' + olpb + '</span></strong> bouteilles en PET économisées</div></span>';
				var buttonPlusOne = '<button style="background-color: #2196f3; margin-top: 5px;" id="btnOlpb" class="btn btn-primary btnClick btn-sm" name="oplb_' + value.idFountain + '" data-bottle="' + value.idFountain + '">+ 1</button>';
				//var infoWindow = new google.maps.InfoWindow();
				var infoWindowContent = "";
				infoWindowContent += '<span class="row-no-padding">'
									  + '<span class="col-xs-2">' + image + '</span>'
									  + '<span class="col-xs-2">' + itinieraryBtn + '</span>'
									  + '<span class="col-xs-1 col-xs-offset-7" style="text-align: center;"><img id="closeBtn" src=".\\img\\Ge-Soif-Glyphicons\\BackBtn.png" style="width:30px"/></span>'
									  + '<span class="col-xs-0 col-lg-1"></span>' +
									  '</span>' +
									  '<span class="row row-no-padding">'
									  + '<span class="col-xs-12">' + adresse + '</span>' +
									  '</span><span class="row row-no-padding">'
									  + '<span class="col-xs-10">' + nbClick + '</span>'
									  + '<span class="col-xs-2" style="text-align: center;">' + buttonPlusOne + '</span>' +
									  '</span>';


				//new google.maps.LatLng(value.latitude, value.longitude);

				$('#slide').stop(true);
				$("#slide").empty();
				$(infoWindowContent).appendTo($("#slide"));
				$("#slide").animate({left: '0'}, 500);

				that.bindCloseButtonClick();
				that.bindOlpbButtonClick();
				that.bindItineraryButtonClick(fountainPos);

				//google.maps.event.addListener($("#slide"), 'domready', function () {
				$(".img-fountain").click(function (event) {
					var imgSrc = event.target.src;
					var res = imgSrc.match(/default\.png/g);
					if (res == null) {
						$('.imagepreview').attr('src', event.target.src);
						$('#imagemodal').modal('show');
					}
				});
					//});
			});
			that.fountainMarkers.push(existingFountainMarker);
		});
	}

    bindItineraryButtonClick(fountainPos) {
		var that = this;
		$("#btnItinerary").bind("click", function () {
			that.calcRoute(fountainPos);
		});
	}

	bindCloseButtonClick(){
		var that = this;
		$('#closeBtn').click(function(){
			$('#slide').stop(true);
			$("#slide").animate({left: '-100%'}, 300);
		});
	}
	
	bindOlpbButtonClick() {
		var that = this;
		$("#btnOlpb").bind("click", function () {
			//data-bottle = l'id de la bouteille remplit
			var idFountain = $(this).attr('data-bottle');
			var button = $(this);

			$.post('./pages/ajaxCall.php',
			{
				'olpbClickIdFountain': parseInt(idFountain)
			}

			,function (data) {
				button.hide();
				$("#olpb_val").text(data);
				$.grep(that.loadedFountains, function(item) {
					if(item.idFountain===idFountain){
						item.olpb = data;}
					});
					//that.loadFountainsAroundMe(); //reload to expensive just for one like. if map is moved or zoomed it will  be reloaded anyway
            }
			);
		});
	}

	calcRoute(destinationLatLng) {
		var that = this;
		var request = {
			origin: new google.maps.LatLng($("#latitude").val(), $("#longitude").val()),
			destination: destinationLatLng,
			travelMode: google.maps.TravelMode.WALKING
			//WALKING / DRIVING / BICYCLING / TRANSIT /
		};
		this.directionsDisplay.setMap(this.map);
		that.directionsService.route(request, function (result, status) {
			var distanceM = result.routes[0].legs[0].distance.value;
			var tempsS = result.routes[0].legs[0].duration.value;
			if (status === google.maps.DirectionsStatus.OK) {
				that.directionsDisplay.setDirections(result);
				// Display the distance:
				// TODO à améliorer
				if (distanceM < 1000) 
				{
					$('#slide').append(that.itineraryKm.text("A pied " + distanceM + " mètres"));
				}
				else 
				{
					$('#slide').append(that.itineraryKm.text("A pied " + parseFloat(distanceM / 1000).toFixed(2) + " kilomètres"));
				}
				if (tempsS < 60) 
				{
					$('#slide').append(that.itineraryTime.text("A pied " + "moins d'une minute"));
				}
				else 
				{
					$('#slide').append(that.itineraryTime.text("A pied " + parseInt(tempsS / 60) + " minutes"));
				}
			}
		});
	}

	switchToAddMode() {
		this.addMode = true;
	}

	switchToNormalMode() {
		this.addMode = false;
		//add click listener on map to allow users to add a new fountain
		$(this.map).off("click");
	}

	addNewMarkerToMap(coord) {
		//if it's the first time we click, create a new marker, if it already exists, just move it
		if (this.newMarker === null) {
			this.newMarker = this.createMarker(coord, "./img/newFountainIcon.png");
			this.newMarker.setVisible(false);         
		} else {
			this.newMarker.setPosition(coord);
			this.newMarker.setVisible(true);
		}
	}

	selectPos(coord){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng': coord
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				$("#address").val(results[0].formatted_address);
				$("#latitude").val(coord.lat());
				$("#longitude").val(coord.lng());
			}
		});
	}

	removeNewMarker() {
		if (this.newMarker != null) {
			this.newMarker.setVisible(false);
			$("#address").val("");
		}
	}

	showAdminView(selectedCoord) {
		var selectedMarker = this.createMarker(selectedCoord, "./img/adminValidationMarker.png");
		this.map.setCenter(selectedCoord);
	}

	assignAddressFromLocation(location, inputId = null){
		var that = this;
		var geocoder = new google.maps.Geocoder();
		var address = "";
	  
		geocoder.geocode({'location': location}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if(results[0]){
					address = results[0].formatted_address;
					if(inputId != null){
						$('#' + inputId).val(address);
					}
				}
			}
		});
	}
   
	updateMapBorders() {
		var sw = this.map.getBounds().getSouthWest();
		var ne = this.map.getBounds().getNorthEast();
		this.swLng = sw.lng();
		this.swLat = sw.lat();
		this.neLat = ne.lat();
		this.neLng = ne.lng();
		this.loadFountainsAroundMe();
    }
}
