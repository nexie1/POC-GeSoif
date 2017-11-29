// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

var timeClosed = 3000; // Temps avant disparition pop-up
var markerEnable = false; // Active le mode d'ajout de marker
var tableauMarkers = []; // Tableau ou sont stockées les coordonnées des markers
var tableauMarkersValider = []; // Tableau ou sont stockées les coordonnées des markers
var positionProvisoire = [];



/******************************************************
************** Affichage Slide + Pop-up ****************
*******************************************************/

    // Slide contenant tous les boutons permettant d'ajouter une fontaine
    var slideAddFountain = new Vue({
        el: '.slideAddFountain',
        data: {
            isDisplayed: false //Se cache au chargement de la page
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
                // Mettre fonction Localisation
            }
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
        },
        methods: {
            closed: function () {
                // Cache la fenêtre de notification
                this.isDisplay = false;
            },
            show: function(from) {
                if(from == "valide") {
                    this.isSuccess = "true"; // Met la classe "alert-success"
                    this.message = 'Merci ! Votre fontaine a bien été ajoutée. Un administrateur doit la valider pour quelle soit visible.'; // Ajoute le contenu à la notification
                }
                else if(from == "cancele") {
                    this.isDanger = "true";
                    this.message = 'Votre fontaine n\'a pas été ajoutée.';
                }
                this.isDisplay = true; // Affiche la notification
                markerEnable = false; // Désactive le mode d'ajout de marker
                mapVue.removeMarkers(); // Supprime le marker existant

                // Ferme la fenêtre après un certain temps (timeClosed)
                setTimeout( function() {
                    alert_popup.closed(); // Cache la fenêtre de notification
                    // Désactive la class de la notif
                    alert_popup.isSuccess = false; 
                    alert_popup.isDanger = false;
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
        },

        mounted: function() {
            var myOptions = {
                minZoom: 4, // Définit le niveau de zoom minimum de la map
                zoom: 12, // Définit le niveau de zoom de la map lors du chargement du site
                mapTypeId: google.maps.MapTypeId.ROADMAP, // Définit le type de map
                center: new google.maps.LatLng(46.2, 6.1667), // Définit les coordonnées de l'endroit au dessus duquel la map va s'afficher au chargement (Genève)
            };
            this.map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions); // La variable "map" prend la valeur de "map_canvas1", le nom de notre map
            this.markerFountainPlaced();

            //Ajout des markers
            google.maps.event.addListener(this.map, 'click', function(event) {
                if (markerEnable == true) {
                    mapVue.placeMarker(event.latLng); // Si markerEnable = true, donc si on clique sur le bouton "+", on peux placer un marker              
                }
            });
        },
        methods: {
            placeMarker: function(location) { // Fonction qui place un marker vert losqu'on clique sur la map
                this.removeMarkers();
                var marker = new google.maps.Marker({
                    position: location,
                    map: this.map,
                    icon: 'img/newFountainIcon.png'
                });
                tableauMarkers.push(marker);
            },
            removeMarkers: function() { // Fonction qui supprime ke marker précédent
                for (i = 0; i < tableauMarkers.length; i++) {
                    tableauMarkers[i].setMap(null);
                }
            },
            markerFountainPlaced: function(){ // Fonction qui affiche 7 markers sur la map
                var infowindow = new google.maps.InfoWindow;
                var geocoder = new google.maps.Geocoder();
                positionProvisoire[0] = {lat: 46.184, lng: 6.148};
                positionProvisoire[1] = {lat: 46.193, lng: 6.107};
                positionProvisoire[2] = {lat: 46.205, lng: 6.157};
                positionProvisoire[3] = {lat: 46.210, lng: 6.143};
                positionProvisoire[4] = {lat: 46.198, lng: 6.142};
                positionProvisoire[5] = {lat: 46.179, lng: 6.128};
                positionProvisoire[6] = {lat: 46.230, lng: 6.110};
                for (i = 0; i < positionProvisoire.length; i++) {
                    var markerPlaced = new google.maps.Marker({
                        position: positionProvisoire[i],
                        map: this.map,
                        icon: 'img/geSoifExistingMarker.png'
                    });
                    tableauMarkersValider.push(markerPlaced);

                    markerPlaced.addListener('click', function() {
                        infowindow.setContent(positionProvisoire[0].lat.toString() + " / " + positionProvisoire[0].lng.toString()).formatted_address /*(results[0].formatted_address)*/;
                        infowindow.open(this.map, markerPlaced);
                    });
                }
            }
        }
    
    });



/******************************************************
******************** Modif HTML ***********************
*******************************************************/

    var Lien = new Vue({
        el: '#index',
        data: {
            message: "GE-Soif",
            link: 'index.php'
        }
    });   
});