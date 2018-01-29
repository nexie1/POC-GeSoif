// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

var timeClosed = 3000; // Temps avant disparition pop-up
var markerEnable = false; // Active le mode d'ajout de marker
var positionProvisoire = []; //Tableaux de markers provisoires




/******************************************************
************** Affichage Slide + Pop-up ****************
*******************************************************/

    // Slide contenant tous les boutons permettant d'ajouter une fontaine
    var slideAddFountain = new Vue({
        el: '.slideAddFountain',
        data: {
            isDisplayed: false, //Se cache au chargement de la page
            imgLocation: 'img/Ge-Soif-Glyphicons/LocationON.png',
            address: ""
        },
        methods: {
            // Valide et envoie dans la BD TODO
            valid: function () {
                // Envoi dans la BD
                this.isDisplayed = false;//Cache le div d'ajout de fontaine
                slideAddFountainBtn.isDisplayed = true; //Affiche le bouton à la fermeture de la slide
                alert_popup.show("valide"); // Affiche la pop-up de validation par l'admin
            },

            // Quitte le mode "slideAddFountain"
            cancel: function () {
                this.isDisplayed = false;//Cache le div d'ajout de fontaine
                slideAddFountainBtn.isDisplayed = true; //Affiche le bouton à la fermeture de la slide
                alert_popup.show("cancele"); // Affiche la pop-up d'erreur de la validation de fontaine
            },

            // Ouvre le menu pour ajouter une photo TODO
            addPhoto: function () {
                // Ouvrir l'explorateur
                // Envoyer dans la BD
            },

            // Localise la personne (si possible) TODO
            location: function () {
                mapVue.placeNewMarker(mapVue.currentPos);
                mapVue.map.setOptions(
                       {center:mapVue.currentPos}
                );
                this.imgLocation = 'img/Ge-Soif-Glyphicons/LocationON.png';
                // Mettre fonction Localisation
            }
        }
    });

    //Slide permettant d'afficher toutes les infos sur la fontaine sélectionnée
    var slideInfo = new Vue({
        el: '.slideInfo',
        data: {
            isDisplayed: false, //Se cache au chargement de la page
            address:"",
        },
        methods: {
            
        }
    });

    //Lors du clic sur le "+" affiche le slide "slideAddFountain"
    var slideAddFountainBtn = new Vue({
        el: '.slideAddNewBtn',
        data: {
            isDisplayed: true //S'affiche au chargement de la page
        },
        methods: {
            show: function () {
                mapVue.placeNewMarker(mapVue.currentPos);
                this.isDisplayed = false; //Cache le bouton d'ajout de fontaine
                slideAddFountain.isDisplayed = true; //Affiche le div d'ajout de fontaine
                markerEnable = true; // Active le mode ajout marker
                alert_popup.show("infoAdd");
            }
        }
    });



/******************************************************
******************** POP-UP ***************************
*******************************************************/
    var alert_popup = new Vue({
        el: '.alert_popup',

        data: {
            isDisplay: false, //Ne s'affiche pas au chargement de la page
            message: "", // Initialise le message à ø 
            
            // Choix de la classe pour la notification
            isSuccess: false,
            isDanger: false,
            isInfo: false,

        },
        methods: {
            closed: function () {
                this.isDisplay = false; // Cache la fenêtre de notification
            },
            show: function(from) {
                if(from == "valide") {
                    this.isSuccess = "true"; // Met la classe "alert-success"
                    this.message = 'Merci ! Votre fontaine a bien été ajoutée. Un administrateur doit la valider pour qu\'elle soit visible.'; // Ajoute le contenu à la notification
                }
                else if(from == "cancele") {
                    this.isDanger = "true";
                    this.message = 'Votre fontaine n\'a pas été ajoutée.';
                }
                else if(from == "inLocation") {
                    this.isInfo = "true";
                    this.message = 'Nous cherchons à vous localiser, veuillez patienter.';
                }
                else if(from == "located") {
                    this.isSuccess = "true";
                    this.message = 'Vous avez bien été localisé !';
                }
                else if(from == "notLocated") {
                    this.isDanger = "true";
                    this.message = 'Vous n\'avez pas été localisé.';
                }
                else if(from == "infoAdd") {
                    this.isInfo = "true";
                    this.message = 'Pour ajuster la position de la fontaine vous pouvez cliquer sur la carte ou taper une adresse.';
                }
                
                this.isDisplay = true; // Affiche la notification
                markerEnable = false; // Désactive le mode d'ajout de marker
                mapVue.removeNewMarker(); // Supprime le marker existant

                // Ferme la fenêtre après un certain temps (timeClosed)
                setTimeout( function() {
                    alert_popup.closed(); // Cache la fenêtre de notification
                    // Désactive la class de la notif
                    alert_popup.isSuccess = false; 
                    alert_popup.isDanger = false;
                    alert_popup.isInfo = false;
                }, timeClosed);
            }
        }
    });



/******************************************************
******************** MAP ******************************
*******************************************************/

    var mapVue = new Vue({
        el: '#vue-map',
        data: {  
            map:null,
            newMarker:null,
            currentPos:null,
            existingFountainMarkers:[] // Tableau ou sont stockées les coordonnées des markers
        },
        watch:{
            currentPos:function() {
                this.addCurrentPositionMarker(); // Place le marker de notre position
            }
        },
        mounted: function() {
            var myOptions = {
                minZoom: 4, // Définit le niveau de zoom minimum de la map
                zoom: 15, // Définit le niveau de zoom de la map lors du chargement du site
                mapTypeId: google.maps.MapTypeId.ROADMAP, // Définit le type de map
                center : new google.maps.LatLng(46.208651, 6.149596),
                // Affichage des boutons zoom/dézoom au centre à gauche et les boutons Plan/Satellite en haut à gauche
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                }
            };
            this.map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions); // La variable "map" prend la valeur de "map_canvas1", le nom de notre map
            this.markerFountainPlaced(); // Place les fontaines sur la carte
            
            this.getMyPosition();

            //Ajout des markers
            google.maps.event.addListener(this.map, 'click', function(event) {
                if (markerEnable == true) {
                    slideAddFountain.imgLocation = 'img/Ge-Soif-Glyphicons/LocationOFF.png';
                    //mapVue.placeNewMarker(mapVue.currentPos); // Si markerEnable = true, donc si on clique sur le bouton "+", on peux placer un marker              
                    mapVue.placeNewMarker(event.latLng); // Si markerEnable = true, donc si on clique sur le bouton "+", on peux placer un marker              
                }
            });
        },
        methods: {
            centerButton: function(){ // Fonction qui recentre sur notre position lors du clic sur le bouton "Centrer"
                mapVue.map.setCenter(mapVue.currentPos);
                this.map.setOptions(
                       {zoom: 15}
                );
            },
            placeNewMarker: function(location) { // Fonction qui place un marker vert losqu'on clique sur la map
                this.removeNewMarker();
                if(this.newMarker === null){
                    // Ne peux pas être modifié car il va de pairs avec la fonction removeNewMarker()
                    this.newMarker = new google.maps.Marker({
                        position: location,
                        map: this.map,
                        icon: 'img/newFountainIcon.png'
                    });

                    mapVue.getAddress(location);
                }
            },
            
            removeNewMarker: function() { // Fonction qui supprime le marker précédent
                if(this.newMarker !== null) {
                    this.newMarker.setMap(null);
                    this.newMarker = null;
                    }
            },
            getAddress: function(location){
                var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': location}, function(result, status){
                    var res = result;
                    slideAddFountain.address = res[0].formatted_address; 
                });
            },
            addMarkersClickListener: function(clickedMarker, infoWindow) {
                    var infoWindow = new google.maps.InfoWindow;

                    $.each(this.existingFountainMarkers, function(index, value){
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({'latLng': value.position}, function(result, status){
                        var res = result;
                        value.addListener("click", function(){
                            /*infoWindow.setContent(res[0].formatted_address);
                            infoWindow.open(this.map, value);    */
                            slideInfo.isDisplayed = true;
                            slideInfo.address = res[0].formatted_address;
                        }
                        );
                    });
                });
            },
            getMyPosition: function() {
                if (navigator.geolocation)
                    {
                        //alert_popup.show("inLocated");
                        navigator.geolocation.getCurrentPosition(function (position)
                        {
                            alert_popup.show("located");
                            mapVue.currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        },
                        function (err)
                        {
                            alert_popup.show("notLocated");
                            mapVue.currentPos = new google.maps.LatLng(46.208651, 6.149596);
                        },
                        {timeout: 10000}
                    );
                }
            },
            markerFountainPlaced: function(){ // Fonction qui affiche 7 markers sur la map
                positionProvisoire[0] = {lat: 46.184, lng: 6.148};
                positionProvisoire[1] = {lat: 46.193, lng: 6.107};
                positionProvisoire[2] = {lat: 46.205, lng: 6.157};
                positionProvisoire[3] = {lat: 46.210, lng: 6.143};
                positionProvisoire[4] = {lat: 46.198, lng: 6.142};
                positionProvisoire[5] = {lat: 46.183, lng: 6.136}; 
                positionProvisoire[6] = {lat: 46.230, lng: 6.110};

                for (i = 0; i < positionProvisoire.length; i++) {
                    var markerPlaced = new google.maps.Marker({
                        position: positionProvisoire[i],
                        map: this.map,
                        icon: 'img/geSoifExistingMarker.png'
                    });
                    this.existingFountainMarkers.push(markerPlaced);
                }

                this.addMarkersClickListener();
            },
            addCurrentPositionMarker:function(){  // Place le marker de notre position: 
                this.createMarker(mapVue.currentPos, "./img/currentPositionMarker.png");
                this.map.setOptions(
                       {center:mapVue.currentPos}
                );
            },
            createMarker: function(markerPosition, markerImageUrl){
                var currentPosMarker = new google.maps.Marker({
                        position: markerPosition,
                        map: mapVue.map,
                        icon: markerImageUrl,
                        zIndex: 100 
                    });
                }
        }
    });



/******************************************************
******************** Modif HTML ***********************
*******************************************************/

    var navBar = new Vue({
        el: '#index',
        data: {
            message: "GE-Soif",
            link: 'index.php'
        },
        methods:{
            /*centerButton: function(){
                mapVue.map.setCenter(mapVue.currentPos);
            },*/

        }
    });   
});