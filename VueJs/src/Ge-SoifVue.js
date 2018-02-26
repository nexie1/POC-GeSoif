// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

    var timeClosed = 3000; // Temps avant disparition pop-up
    var markerEnable = false; // Active le mode d'ajout de marker




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
                mapVue.placeNewMarker(mapVue.currentPos); // fonction placeNewMarker avec en parametre notre position
                mapVue.map.setOptions(
                        {center: mapVue.currentPos,
                            zoom: 15}
                ); // centre la map sur notre position
                this.imgLocation = 'img/Ge-Soif-Glyphicons/LocationON.png';
            }
        }
    });

    //Slide de la fenêtre contenant les informations des fontaines (cette fenêtre n'est la que pour la déco)
    var slideInfoClosed = new Vue({
        el: '.slideInfoClosed',
        data: {
            isDisplayed: false, //Se cache au chargement de la page
            address: "", // Set l'addresse à vide
        },
        methods: {
            backBtn: function () {
                slideInfo.isDisplayed = true; // Permet d'afficher la slide contenant toutes les informations des fontaines
                this.isDisplayed = false; // Cache le morceau de fenêtre
            }
        }
    });

    //Slide permettant d'afficher toutes les infos sur la fontaine sélectionnée
    var slideInfo = new Vue({
        el: '.slideInfo',
        data: {
            isDisplayed: false, //Se cache au chargement de la page
            address: "", // Set l'addresse à vide
            tempsItineraire: "",
            distanceItineraire: "",
            coord: ""
        },
        methods: {
            backBtn: function () {
                slideInfoClosed.isDisplayed = true; // Affiche le morceau de fenêtre
                this.isDisplayed = false; // Cache la fenêtre contenant toutes les informations de la fontaine
            },
            directions: function () {
                //this.calcRoute(slideInfo.coord);
                location.href = "https://www.google.fr/maps/dir/"+mapVue.currentPos+"/"+slideInfo.coord+"/";

            },
            closeBtn: function () {
                slideInfoClosed.isDisplayed = false; // Affiche le morceau de fenêtre
                this.isDisplayed = false; // Cache la fenêtre contenant toutes les informations de la fontaine
            },
            calcRoute: function (destinationLatLng) {
                var request = {
                    origin: mapVue.currentPos,
                    destination: destinationLatLng,
                    travelMode: google.maps.TravelMode.WALKING
                            //WALKING / DRIVING / BICYCLING / TRANSIT /
                };
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                directionsDisplay.setMap(mapVue.map);
                directionsService.route(request, function (result, status) {
                    var distanceM = result.routes[0].legs[0].distance.value;
                    var tempsS = result.routes[0].legs[0].duration.value;
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                        // Display the distance:
                        //TODO à améliorer
                        if (distanceM < 1000) {
                            distanceItineraire = ("A pied " + distanceM + " mètres");
                        } else {
                            distanceItineraire = ("A pied " + parseFloat(distanceM / 1000).toFixed(2) + " kilomètres");
                        }
                        if (tempsS < 60) {
                            tempsItineraire = ("A pied " + "moins d'une minute");
                        } else {
                            tempsItineraire = ("A pied " + parseInt(tempsS / 60) + " minutes");
                        }
                    }
                });
            },

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
            show: function (from) {
                if (from == "valide") {
                    this.isSuccess = "true"; // Met la classe "alert-success"
                    this.message = 'Merci ! Votre fontaine a bien été ajoutée. Un administrateur doit la valider pour qu\'elle soit visible.'; // Ajoute le contenu à la notification
                } else if (from == "cancele") {
                    this.isDanger = "true";
                    this.message = 'Votre fontaine n\'a pas été ajoutée.';
                } else if (from == "located") {
                    this.isSuccess = "true";
                    this.message = 'Vous avez bien été localisé !';
                } else if (from == "notLocated") {
                    this.isDanger = "true";
                    this.message = 'Vous n\'avez pas été localisé.';
                } else if (from == "infoAdd") {
                    this.isInfo = "true";
                    this.message = 'Pour ajuster la position de la fontaine vous pouvez cliquer sur la carte.';
                }

                this.isDisplay = true; // Affiche la notification
                markerEnable = false; // Désactive le mode d'ajout de marker
                mapVue.removeNewMarker(); // Supprime le marker existant

                // Ferme la fenêtre après un certain temps (timeClosed)
                setTimeout(function () {
                    alert_popup.closed(); // Cache la fenêtre de notification
                    // Désactive la class de la notification
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
            map: null,
            newMarker: null,
            currentPos: null,
            existingFountainMarkers: [], // Tableau ou sont stockées les coordonnées des markers
            positionProvisoire: [],
            monTest: "salut"
        },
        watch: {
            currentPos: function () {
                this.addCurrentPositionMarker(); // Place le marker de notre position
            }
        },
        mounted: function () {
            var myOptions = {

                minZoom: 4, // Définit le niveau de zoom minimum de la map
                zoom: 15, // Définit le niveau de zoom de la map lors du chargement du site
                mapTypeId: google.maps.MapTypeId.ROADMAP, // Définit le type de map
                center: new google.maps.LatLng(46.208651, 6.149596),
                // Affichage des boutons zoom/dézoom au centre à gauche et les boutons Plan/Satellite en haut à gauche
                mapTypeControl: true,
                mapTypeControlOptions: {// choix satelite ou plans
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                zoomControl: true,
                zoomControlOptions: {// zoom + et -
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {// activation du street view
                    position: google.maps.ControlPosition.LEFT_CENTER
                }
            };
            this.map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions); // La variable "map" prend la valeur de "map_canvas1", le nom de notre map
            this.markerFountainPlaced(); // Place les fontaines sur la carte

            this.getMyPosition(); // appel la fonction qui va trouver ma position, s'il ne me trouve pas, ne place à la position par-défaut

            //Ajout des markers
            google.maps.event.addListener(this.map, 'click', function (event) {
                if (markerEnable == true) { // Test si le marqueurs est activé, si c'est le cas place un markers à la position du clic.
                    slideAddFountain.imgLocation = 'img/Ge-Soif-Glyphicons/LocationOFF.png';
                    mapVue.placeNewMarker(event.latLng); // Si markerEnable = true, donc si on clique sur le bouton "+", on peux placer un marker              
                }
            });
        },
        methods: {
            placeNewMarker: function (location) { // Fonction qui place un marker vert losqu'on clique sur la map            
                this.removeNewMarker(); // fonction qui supprime le marker précédent
                if (this.newMarker === null) {
                    // Ne peux pas être modifié car il va de pairs avec la fonction removeNewMarker()
                    this.newMarker = new google.maps.Marker({
                        position: location,
                        map: this.map,
                        icon: 'img/newFountainIcon.png'
                    });

                    mapVue.getAddress(location); // Transforme les positions en adresse (46.11231, 32.4453 = chemin du bac ...)
                }
            },
            centerButton: function () { // Fonction qui recentre sur notre position lors du clic sur le bouton "Centrer"
                mapVue.map.setCenter(mapVue.currentPos);
                this.map.setOptions(// règle le zoom à 15
                        {zoom: 15}
                );
            },

            removeNewMarker: function () { // Fonction qui supprime le marker précédent
                if (this.newMarker !== null) {
                    this.newMarker.setMap(null);
                    this.newMarker = null;
                }
            },
            getAddress: function (location) { // Permet d'afficher l'adresse dans la slide d'ajout de fontaine
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': location}, function (result, status) {
                    var res = result;
                    slideAddFountain.address = res[0].formatted_address; // res[0] correspond à la précision ultime de GG.map
                });
            },
            addMarkersClickListener: function (clickedMarker, infoWindow) {// Permet d'afficher l'adresse dans la slide d'info de fontaine
                $.each(this.existingFountainMarkers, function (index, value) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': value.position}, function (result, status) {
                        var res = result;
                        value.addListener("click", function () {
                            slideInfo.isDisplayed = true; // Affiche la slide info
                            slideInfoClosed.isDisplayed = false; // Cache la slide info fermée
                            slideInfo.address = res[0].formatted_address;
                            slideInfo.coord = value.position;
                        }
                        );
                    });
                });
            },
            getMyPosition: function () { // Utilise Gogole pour trouver notre position
                if (navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(function (position) // Si ça marche affiche notre position
                    {
                        alert_popup.show("located");
                        mapVue.currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    },
                            function (err)// Si ça marche pas affiche la position par défaut
                            {
                                alert_popup.show("notLocated");
                                mapVue.currentPos = new google.maps.LatLng(46.208651, 6.149596);
                            },
                            {timeout: 10000}
                    );
                }
            },
            markerFountainPlaced: function () { // Fonction qui affiche 7 markers sur la map
                $.get("./pages/ajaxCall.php", {getFountains: "true"}).done(function (data) {
                    var loadedFountains = JSON.parse(data)
                    //new google.maps.LatLng//{lat: 46.184, lng: 6.148};
                  
                    $.each(loadedFountains, function(index,value){
                        var markerPlaced = new google.maps.Marker({
                            position: new google.maps.LatLng(value.latitude,value.longitude),
                            map: mapVue.map,
                            icon: 'img/geSoifExistingMarker.png'
                        });
                        mapVue.existingFountainMarkers.push(markerPlaced);
                    });

                    mapVue.addMarkersClickListener();


                });

            },
            addCurrentPositionMarker: function () {  // Place le marker de notre position: 
                this.createMarker(mapVue.currentPos, "./img/currentPositionMarker.png");
                this.map.setOptions(
                        {center: mapVue.currentPos}
                );
            },
            createMarker: function (markerPosition, markerImageUrl) { // Créer un marqueur à la position demandée avec l'image demandée
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
    });
});