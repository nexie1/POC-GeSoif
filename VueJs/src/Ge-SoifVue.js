// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {





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
                alert_popup.isDisplayed = true; // Affiche la pop-up de validation par l'admin
            },

            // Quitte le mode "slideAddFountain"
            cancel: function () {
                this.isDisplayed = false;//Cache le div d'ajout de fontaine
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
                this.isDisplayed = false; //Cache le bouton d'ajout de fontaine
                slideAddFountain.isDisplayed = true; //Affiche le div d'ajout de fontaine
            }
        }
    });



/******************************************************
******************** POP-UP ***************************
*******************************************************/

    var alert_popup = new Vue({
        el: '.alert_popup',
        data: {
            isDisplayed: false
        },
        methods: {
            closed: function () {
                this.isDisplayed = false;
            }
        }
    });



/******************************************************
******************** MAP ******************************
*******************************************************/

    var demo = new Vue({
    el: '#vue-map',
    data: {
    
  },
    mounted: function() {
    var myOptions = {
        minZoom: 4,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(46.2, 6.1667)
    };
    var map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions);
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