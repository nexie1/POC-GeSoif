// Permet l'éxécution du code (sinon ça ne marche pas)
$(document).ready(function () {

var timeClosed = 3000; // Temps avant disparition pop-up
var markerEnable = false;
var tableauMarkers = [];
var tableauMarkersFountain = [];

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
                tableauMarkersFountain[0] += tableauMarkers[0];
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
                markerEnable = true;
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
                markerEnable = false;
                removeMarkers();

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
    
    
    google.maps.event.addListener(map, 'click', function(event) {     
                       
        if (markerEnable == true) {
            
            placeMarker(event.latLng);      
            
            // adding listener, so infowindow is opened   
            
        }     
    });
    marker.addListener('click', function(event) {
                console.log("marker was clicked");
                infowindow.open(map, marker);
            });
    
    
    
    // preparing infowindow
            var infowindow = new google.maps.InfoWindow({
                content: '<h4>info:</h4>' + '<info><h2 v-on="click: hello">{{title}}</h2><br/>Lsdaqawdfqawdqwdqwdqwdqwdqwdqwdqwdqw</info>'
            });           
            google.maps.event.addListener(infowindow, 'domready', function() {
                var info = new Vue({
                    data: function() {
                        return {
                            title: undefined
                        };
                    },
                    ready: function() {
                        this.title = 'title ' + Math.floor((Math.random() * 10) + 1);
                    },
                    el: function() {
                        return 'info';
                    },
                    methods: {
                        hello: function() {
                            console.log('clicked !!!');
                        }
                    }
                });
            });
            function placeMarkerFountain(location2) {
            var marker2 = new google.maps.Marker({
            position: location2, 
            map: map,
            icon: 'img/geSoifExistingMarker'
            });
            tableauMarkersFountain.push(marker2);
        }
           
        function placeMarker(location) {
            removeMarkers();
            var marker = new google.maps.Marker({
            position: location, 
            map: map,
            icon: 'img/newFountainIcon.png'
            });
            tableauMarkers.push(marker);
        }
    },
    components: {
        info: Vue.extend({
            el:  function() { return 'info'; },
            template: '<h2>hello</h2>'
        })
    }
});
    function removeMarkers(){
    for(i = 0; i < tableauMarkers.length; i++){
        tableauMarkers[i].setMap(null);
    }
    
}

    /*var map = new Vue({
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
            removeMarkers();
            var marker = new google.maps.Marker({
            position: location, 
            map: map,
            icon: 'img/newFountainIcon.png'
            });
            tableauMarkers.push(marker);
        }
    }
    
});
    function removeMarkers(){
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







  /*window.initMap = function() {
    app.$emit('google.maps:init');
    console.log('fired message');
};*/
    
/*var app = new Vue({
    el: 'body',
    events: {
        'google.maps:init': function() {
            // init google map
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 53.539806,
                    lng: 9.990993
                },
                zoom: 12
            });
            // add marker
            var marker = new google.maps.Marker({
                position: {
                    lat: 53.539806,
                    lng: 9.990993
                },
                map: map,
                label: 'A'
            });
            // preparing infowindow
            var infowindow = new google.maps.InfoWindow({
                content: '<h4>info:</h4>' + '<info><h2 v-on="click: hello">{{title}}</h2><br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</info>'
            });
            // adding listener, so infowindow is opened
            marker.addListener('click', function(event) {
                console.log("marker was clicked");
                infowindow.open(map, marker);
            });
            google.maps.event.addListener(infowindow, 'domready', function() {
                var info = new Vue({
                    data: function() {
                        return {
                            title: undefined
                        };
                    },
                    ready: function() {
                        this.title = 'title ' + Math.floor((Math.random() * 10) + 1);
                    },
                    el: function() {
                        return 'info';
                    },
                    methods: {
                        hello: function() {
                            console.log('clicked !!!');
                        }
                    }
                });
            });
        }
    },
    components: {
        info: Vue.extend({
            el:  function() { return 'info'; },
            template: '<h2>hello</h2>'
        })
    }
});*/
   
   
  
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
});












/*<body>
  <div id="root">
    <label>
      Das Label
      <gmap-autocomplete :value="description"
        @place_changed="setPlace">
      </gmap-autocomplete>
    </label>
    <br/>
    {{latLng.lat}},
    {{latLng.lng}}
  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"></script>
<script src="vue-google-maps.js"></script>

<script>

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
    libraries: 'places'
  },
});

document.addEventListener('DOMContentLoaded', function() {
  new Vue({
    el: '#root',
    data: {
      description: 'Singapore',
      latLng: {}
    },
    methods: {
      setDescription(description) {
        this.description = description;
      },
      setPlace(place) {
        this.latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      }
    }
  });
});

</script>

</body>*/
