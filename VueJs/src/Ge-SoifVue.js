// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {
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
                slideAddFountain.isDisplayed = false;//Cache le div d'ajout de fontaine
                slideAddFountainBtn.isDisplayed = true; //Affiche le bouton à la fermeture de la slide
            },

            // Quitte le mode "slideAddFountain"
            cancel: function () {
                slideAddFountain.isDisplayed = false;//Cache le div d'ajout de fontaine
                slideAddFountainBtn.isDisplayed = true; //Affiche le bouton à la fermeture de la slide
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
                slideAddFountain.isDisplayed = true; //Affiche le div d'ajout de fontaine
                this.isDisplayed = false; //Cache le bouton d'ajout de fontaine
            }
        }
    });

    //Affichage de la map
   var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(46.2, 6.1667),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

// Let's draw the map
    var map = new google.maps.Map(document.getElementById("map_canvas1"), mapOptions);


    var demo = new Vue({
        el: '#vue-map',
        data: {

        },
        ready: function () {
            var myOptions = {
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: new google.maps.LatLng(46.2, 6.1667)
            };
            //var map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions);
        }
    });

   
});