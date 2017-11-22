// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

var timeClosed = 3000; // Temps avant disparition pop-up



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
                //alert_popupValid.show(); // Affiche la pop-up de validation par l'admin
                alert_popup.show("valide");
            },

            // Quitte le mode "slideAddFountain"
            cancel: function () {
                this.isDisplayed = false;//Cache le div d'ajout de fontaine
                slideAddFountainBtn.isDisplayed = true; //Affiche le bouton à la fermeture de la slide
                //alert_popupUnvalid.show(); // Affiche la pop-up d'erreur de la validation de fontaine
                alert_popup.show("cancele");
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
/*
    var alert_popupValid = new Vue({
        el: '.alert_popupValid',
        data: {
            isDisplay: false //Ne s'affiche pas au chargement de la page
        },
        methods: {
            closed: function () {
                this.isDisplay = false;
            },
            show: function() {
                this.isDisplay = true;

                setTimeout( function() {
                    alert_popupValid.closed();
                }, timeClosed);
            }
        }
    });

    var alert_popupUnvalid = new Vue({
        el: '.alert_popupUnvalid',
        data: {
            isDisplay: false //Ne s'affiche pas au chargement de la page
        },
        methods: {
            closed: function () {
                this.isDisplay = false;
            },
            show: function() {
                this.isDisplay = true;
                
                setTimeout( function() {
                    alert_popupUnvalid.closed();
                }, timeClosed);
            }
        }
    });

*/


    var alert_popup = new Vue({
        el: '.alert_popup',

        data: {
            isDisplay: false, //Ne s'affiche pas au chargement de la page
            message: "",
            isSuccess: false,
            isDanger: false,
        },
        methods: {
            closed: function () {
                this.isDisplay = false;
            },
            show: function(from) {
                if(from == "valide") {
                    this.isSuccess = "true";
                    this.message = 'Merci ! Votre fontaine a bien été ajoutée. Un administrateur doit la valider pour quelle soit visible.';
                }
                else if(from == "cancele") {
                    this.isDanger = "true";
                    this.message = 'Votre fontaine n\'a pas été ajoutée.';
                }
                this.isDisplay = true;
                
                setTimeout( function() {
                    alert_popup.closed();
                    alert_popup.isSuccess = false;
                    alert_popup.isDanger = false;
                }, timeClosed);
            }
        }
    });


/******************************************************
******************** MAP ******************************
*******************************************************/

    var map = new Vue({
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
    
    //Ajout des markers
    google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
});

    function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: map,
        icon: 'img/newFountainIcon.png'
        });
    }
}
});


    /*

    var removeMarker = new Vue({

    })


    var marker = new Vue({
        //el: '',
        data: {

        },
        click: function() {
            if (exist == true) {
                removeMarker(); //fonction future
                exist = false;
                marker.click();
            }
            else{
                addMarkerOnPos(); //fonction future
                exist = true;
            }
        }
        
    })
*/
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