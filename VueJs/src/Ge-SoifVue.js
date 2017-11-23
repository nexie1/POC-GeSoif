// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

var timeClosed = 3000; // Temps avant disparition pop-up
var markerEnable = false; // Active le mode d'ajout de marker
var tableauMarkers = []; // Tableau ou sont stockées les coordonnées des markers



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
                map2.removeMarkers(); // Supprime le marker existant

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

    var map2 = new Vue({
        el: '#vue-map',
        data: {  
            map:null,
        },

        mounted: function() {
            var myOptions = {
                minZoom: 4, // Définit le niveau de zoom minimum de la map
                zoom: 12, // Définit le niveau de zoom de la map lors du chargement du site
                mapTypeId: google.maps.MapTypeId.ROADMAP, // Définit le type de map
                center: new google.maps.LatLng(46.2, 6.1667) // Définit les coordonnées de l'endroit au dessus duquel la map va s'afficher au chargement (Genève)
            };
            this.map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions); // La variable "map" prend la valeur de "map_canvas1", le nom de notre map
    
            //Ajout des markers
            google.maps.event.addListener(this.map, 'click', function(event) {
                if (markerEnable == true) {
                    map2.placeMarker(event.latLng); // Si markerEnable = true, donc si on clique sur le bouton "+", on peux placer un marker              
                }
            });
        },
        methods: {
            placeMarker: function(location) {
                this.removeMarkers();
                var marker = new google.maps.Marker({
                    position: location,
                    map: this.map,
                    icon: 'img/newFountainIcon.png'
                });
                tableauMarkers.push(marker);
            },
            removeMarkers: function() {
                for (i = 0; i < tableauMarkers.length; i++) {
                    tableauMarkers[i].setMap(null);
                }
            }
        }
    
    });



/*
    var markerAddFountain = new Vue({ 
        data: {

        },
        methods: {
            placeMarker: function(location) {
                markerAddFountain.removeMarkers();

            var map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions);
                var marker = new google.maps.Marker({
                    position: location,
                    map: map.mounted,
                    icon: 'img/newFountainIcon.png'
                });
                tableauMarkers.push(marker);
            },
            removeMarkers: function() {
                for (i = 0; i < tableauMarkers.length; i++) {
                    tableauMarkers[i].setMap(null);
                }
            }
        }
    });
*/


    /*var map = new Vue({
        el: '#vue-map',
        data: {  
        },

        mounted: function() {
            var myOptions = {
                minZoom: 4, // Définit le niveau de zoom minimum de la map
                zoom: 12, // Définit le niveau de zoom de la map lors du chargement du site
                mapTypeId: google.maps.MapTypeId.ROADMAP, // Définit le type de map
                center: new google.maps.LatLng(46.2, 6.1667) // Définit les coordonnées de l'endroit au dessus duquel la map va s'afficher au chargement (Genève)
            };
            var map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions); // La variable "map" prend la valeur de "map_canvas1", le nom de notre map
    
            //Ajout des markers
            google.maps.event.addListener(map, 'click', function(event) {
                if (markerEnable == true) {
                    placeMarker(event.latLng); // Si markerEnable = true, donc si on clique sur le bouton "+", on peux placer un marker              
                }
            });

            function placeMarker(location) {
                removeMarkers(); // Supprime le marker existant
                var marker = new google.maps.Marker({ 
                    position: location, // Va placer le marker à l'endroit du clic de la souris
                    map: map, // La map sur laquelle le système de marker est "map_canvas1" définit plus haut
                    icon: 'img/newFountainIcon.png' // L'icône de base de Google est remplacée par une image personnalisée
                });
                tableauMarkers.push(marker); // Place le marker dans le tableau
            }
        },
    
    });

    function removeMarkers(){ // Fonction qui supprime le marker déjà existant
        for(i = 0; i < tableauMarkers.length; i++){
            tableauMarkers[i].setMap(null);
        }
    }*/



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