/*
* Main JS file, used to launch the application
*
* Authors :
* v1 : Antonio Pisanello, Robin Plojoux,
* v2 : Gabriel Strano, Nohan Budry, Yohann Perez, Jasmina Travnjak
*/
var messages = {
   ADDFOUNTAIN: 0,
   GEOINFO: 1,
   WARNING: 2,
   GEOERROR: 3,
   SUCCESSADD: 4,
   LOADING: 5
};
var files = new Array();
var geSoif = null;

$().ready(function () {
   $('#map-canvas').height($('#map-canvas').height() - $('nav:first').height() + 'px');
    $('div .container').css('margin', $('nav:first').height() + 'px 0 0 0');
    $('#addFountainDivPos').css('top', 0 + 'px');
  
      initialize();
      
      
 $("#formAddFountain").on("submit", function (event) {
        event.preventDefault();
        manageAddFountainWithAjax();
        switchToNormalMode();
        geSoif.removeNewMarker();
       $("#btnShowAddFountain").css("display", "block");
    });
      
     //manage form submit event for fountain add
    
   $("#btnAddFountain").click(function (event) {
     $("#formAddFountain").trigger("submit");   
   });
});

function manageActualPosClick() {
    $('#actualPos').attr("src", "./img/Ge-Soif-Glyphicons/LocationON.png");
    var latLng = new google.maps.LatLng($("#latitude").val(), $("#longitude").val());
    geSoif.addNewMarkerToMap(latLng);
    geSoif.assignAddressFromLocation(latLng, 'address');
    geSoif.map.setCenter(latLng);
}

function prepareUpload(event){
   files = event.target.files;
   
   var infoFilesWithFilesEncoded = [];

   infoFilesWithFilesEncoded[0] = [];
   infoFilesWithFilesEncoded[0][0] = [];
   infoFilesWithFilesEncoded[0][0] = files[0];
   infoFilesWithFilesEncoded[0][1] = "";

   if (typeof window.FileReader !== 'undefined') {
      reader = new FileReader();

      //event onload s'execute à la fin de la function chargeFiles
      reader.onload = function (event) {
         infoFilesWithFilesEncoded[0][1] = event.target.result; // données DataURL
		  $("#AddPhoto").attr('src', event.target.result); // show image tumbnail
      };
      reader.readAsDataURL(infoFilesWithFilesEncoded[0][0]);
   }

}


/**
* initialize the map and bind events needed to run the app
* @returns nothing
*/
function initialize(){
   //init the map
   initMapWithPositionAndFountains();

   //bind events for links and buttons
   bindEvents();
}

/***
* Tests if the geolocation is supported, if it is the function initializes a Google Map with the current position (or default position if geolocation refused)
*
*/
function initMapWithPositionAndFountains() {
   // Try HTML5 geolocation
   if (navigator.geolocation)
   {
      handleUserMessages(messages.LOADING);
      navigator.geolocation.getCurrentPosition(function (position)
      {
        var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geSoif = new GeSoifMap('map-canvas', currentPosition, 'itineraryKm', 'itineraryTime');
        //manageGeoLocationButton(geSoif.map);		
        bindMapEvents();
      },
      function (err)
      {
         handleUserMessages(messages.GEOINFO);
         var defaultPosition = new google.maps.LatLng(46.208651, 6.149596);
         geSoif = new GeSoifMap('map-canvas', defaultPosition, 'itineraryKm', 'itineraryTime');

         bindMapEvents();
      },
      {timeout: 10000}
   );
}
else
{
   // Browser doesn't support Geolocation
   handleUserMessages(messages.GEOERROR);
}

}

function manageGeoLocationButton(map) {
	var geolocationDiv = document.createElement('div');
        var centerControl = CenterOnMyPosition(geolocationDiv, map);
        geolocationDiv.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_CENTER].push(geolocationDiv);
        centerControl.addEventListener('click', function() {
               location.reload(); //for now easier to relaod the whole page to geolocate again, 
        });
}
/***
*
* Binds the js events to all the buttons present on the page and in the menus
*/
function bindEvents() {
   //alert closing buttons
   $('#alert_template .close').click(function (e) {
      $("#alert_template span").remove();
   });

   //add event listener on about link
   $(".aboutLink").bind("click", function () {
      window.location.href = "./about.php";
   });

   //close navigation menu when clicking on addfountain link
   $(document).on('click', '.navbar-collapse.in', function (e) {
      if ($(e.target).is('#addFountainLink')) {
         $(this).collapse('hide');
      }
   });

   //confirm adding fountain, and go back to normal mode
   $('#btnAddFountain').click(function(event){
       event.preventDefault();
      $('#addFountainDivPos').css('display', 'none');
      switchToNormalMode();
   });
   
   //cancel fountain add
   $('#btnCancelAddFountain').click(function(){
      switchToNormalMode();
      geSoif.removeNewMarker();
      $('#addFountainDivPos').css('display', 'none');
      $("#btnShowAddFountain").css("display", "block");
   });
     
	 
	 // manage file upload preparation for ajax call and image preview
   $('#FileInput').on('change', function (e) {		      
		prepareUpload(e);
    });
}

function retrieveMyLocation(callbackFct){
    //retrieve location again and set address according to it
    navigator.geolocation.getCurrentPosition(function (position)
     {
         $("#latitude").val(position.coords.latitude);
         $("#longitude").val(position.coords.longitude);     
         callbackFct();
     });
}



function bindMapEvents() {
	var that = this;
   //add event listener on add fountain link
   $('#actualPos').click(function(event){
       event.preventDefault();
        //retrieve location again and set address according to it
        retrieveMyLocation(manageActualPosClick);
   });

   $("#btnShowAddFountain").bind("click", function () {
      switchToAddMode(geSoif);
      geSoif.addNewMarkerToMap(new google.maps.LatLng($("#latitude").val(), $("#longitude").val()));
      geSoif.assignAddressFromLocation(new google.maps.LatLng($("#latitude").val(), $("#longitude").val()), 'address');
      $("#addFountainDivPos").css("display", "block");
      $("#btnShowAddFountain").css("display", "none");
   });
   //switch to add mode when coming from managefountains or about page
   if (window.location.search.substring(1) == "add") {
      switchToAddMode(geSoif);
   }
   /*admin mode WORK IN PROGRESS*/
   if (window.location.search.substring(1).indexOf("validation") !== -1) {
      var splitlatlng = $("#hidden_latlng").val().split(',');
      var lat = splitlatlng[0];
      var lng = splitlatlng[1];
      var newFountainPosition = new google.maps.LatLng(lat, lng);
      geSoif.showAdminView(newFountainPosition);
	  //that.map.setCenter(newFountainPosition);
	  geSoif.map.setCenter(newFountainPosition);
   }

}

/***
*
* add fountains with ajax
*/
function manageAddFountainWithAjax() {
    
   var arrayFiles = [];
   var stringifiedArrayImage = "";
   var title = $("#title").val();
   var address = $("#address").val();
   var lat = $("#latitude").val();
   var lng = $("#longitude").val();
   
    var data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('latitude', lat);
    data.append('longitude', lng);

    /*var fileData = new FormData();*/
    $.each(files, function (key, value)
    {
        data.append('imgFile', value);
    });
   
     $.ajax({url: './pages/ajaxCall.php?addFountain=true',
            data: data,
            type: 'post',
            contentType: false,
            processData: false,
            success: function (data) {
                handleUserMessages(messages.SUCCESSADD);
                files = new Array();
            }
        });
        return false;
        } 

//répartit un string trop long dans plusieurs cases d'un tableau
/*function getStringHashed(monString) {
   var MAX_STRING_LENGTH = 300;
   var monStringHashed = [];

   //initialise chaques tableaux en parcourant la chaine petit à petit
   for (var i = 0; i < monString.length / MAX_STRING_LENGTH; i++) {
      monStringHashed[i] = "";

      //ajoute les caractères au tableau
      for (var ii = i * MAX_STRING_LENGTH; ii < (i + 1) * MAX_STRING_LENGTH; ii++) {
         monStringHashed[i] += monString[ii];
      }
   }
   return monStringHashed;
}*/

function switchToNormalMode() {
   if (geSoif !== null) {
      geSoif.switchToNormalMode();
	  $("#AddPhoto").attr('src', "img/Ge-Soif-Glyphicons/AddPhotoBtn.png"); // remove image tumbnail that was added before
   }
}

/***
* shows the add div and adds a click listener to the map in order to allow a user to add a new marker
* @param {GeSoifMap app} geSoif
* @returns {nothing}
*/
function switchToAddMode(geSoif) {
   geSoif.switchToAddMode();
   handleUserMessages(messages.ADDFOUNTAIN);
}

function handleUserMessages(messageType) {
   var content = "";
   var alertClass = "";
   switch (messageType) {
      case messages.GEOERROR:
      content = "Erreur: Le service de géolocalisation n'est pas disponible sur votre appareil.";
      alertClass = "alert-danger";
      break;
      case messages.GEOINFO:
      content = "Nos satellites ne vous ont pas trouvé, vous serez automatiquement placé à Genève.";
      alertClass = "alert-info";
      break;
      case messages.ADDFOUNTAIN:
      content = "Pour ajuster la position de la fontaine vous pouvez cliquer sur la carte ou taper une adresse.";
      alertClass = "alert-info";
      break;
      case messages.SUCCESSADD:
      content = "Merci! Votre fontaine a bien été ajoutée. Un administrateur doit la valider pour qu'elle soit visible.";
      alertClass = "alert-success";
      break;
      case messages.LOADING:
      content = "Nous cherchons à vous localiser, veuiller patienter....";
      alertClass = "alert-info";
      break;
   }
   showAlert(alertClass, content);
}

function showAlert(alertClass, content) {
   //remove all other classes except alert
    $("#alert_template").removeClass().addClass('alert');
    //add related class
   $("#alert_template").addClass(alertClass);
   $('#alert_template').find('span').remove()
   $("#alert_template button").after('<span>' + content + '</span>');
   $('#alert_template').fadeIn('slow');
   setTimeout(function () { // this will automatically close the alert and remove this if the users doesnt close it in 3 secs
      $("#alert_template").hide();
   }, 5000);
}


function CenterOnMyPosition(controlDiv, map) {
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';      
	controlUI.style.marginLeft = '10px';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);
		
        var oImg = document.createElement("img");
        oImg.setAttribute('src', 'img/Ge-Soif-Glyphicons/locateMe.png');
        oImg.setAttribute('alt', 'My location');
        oImg.setAttribute('height', '25px');
        oImg.setAttribute('width', '25px');

        controlUI.appendChild(oImg);

        return controlUI;      
      }
