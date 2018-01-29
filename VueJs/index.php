<?php
$input_cache_latlng = "";

if (isset($_REQUEST['latlng'])) {
    $input_cache_latlng = $_REQUEST['latlng'];
}
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script src="src/vue.js" type="text/javascript"></script>
        <script src="src/Ge-SoifVue.js" type="text/javascript"></script>
        <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">-->
        <link href="bs/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <!-- Optional theme -->
        <link href="bs/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
        <link href="MyGe-SoifCss.css" rel="stylesheet" type="text/css"/>
        <link rel="icon" href="./img/devices_icon/GeSoif.ico">
        <!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=geometry"></script>-->
        <title>Ge-Soif!</title>

        <!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCx44Y7o1u2yQR0H0_CRLS0HT81i1UEtsY&libraries=places"></script>
                <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&language=fr"></script>
        <script src="https://maps.googleapis.com/maps/api/js?libraries=places&language=fr"></script>-->


    </head>
    <body class="scroll">    
    <?php
    include("./Menu/MenuDeco.php");
    ?>

    
<!--<div id="demo">
    <p><i>myInstanceAddress</i> Property</p>
    <pre>{{ myInstanceAddress | json }}</pre>
            <input id="addressInput" type="text" />
        </div>-->



    <!--Affichage du div d'ajout de fontaine-->
    <div v-if="isDisplayed" class="slideAddFountain">   

        <!-- Mettre tout les trucs pour add une foutaine -->
            <div class="row" >
                <div  class="col-xs-offset-2 col-xs-10">                        
                    <label class="label label-info"> Adresse choisie : </label>      
                </div>
            </div>
            <div class="row">
                <div id="divBtnLocation"  class="col-xs-2">
                    <button class="littleImg StyleBtn" v-on:click="location"><img class="stylePhoto" id="actualPos" :src="imgLocation" alt="image location"></button>
                </div>
                <div  class="col-xs-6">
                    <label type="text" class="form-control" name="address" id="address">{{address}}</label> 
                </div>
                <div class="col-xs-3">                        
                    <div class="image-upload">
                        <label for="FileInput">
                            <img v-on:click="addPhoto" class="stylePhoto littleImg" id="AddPhoto" alt="Ajouter une photo" src="img/Ge-Soif-Glyphicons/AddPhotoBtn.png">
                        </label>
                        <input type="file" class="col-xs-3 form-control-file" accept="image/*" name="imgFile" id="FileInput"/>
                    </div>                               
                </div>
            </div>


                <!--button><img src="img/Ge-Soif-Glyphicons/AddPhotoBtn.png" alt=""/></button-->

            <div class="row">
                <div class="col-xs-6">
                </div>
                <div class="btn-group col-xs-6">
                    <button v-on:click="valid" type="submit" class="btn StyleBtn"><img class="stylePhoto" src="img/Ge-Soif-Glyphicons/ValidBtn.png" id='btnAddFountain' alt="Ajouter la fontaine"/></button>
                        <button v-on:click="cancel" class="btn StyleBtn"><img class="stylePhoto" src="img/Ge-Soif-Glyphicons/CancelBtn.png" id='btnCancelAddFountain' alt="Annuler"></button>
                </div>
            </div>

    </div>



    <div id="vue-map">
        <button v-on:click="centerButton" type="button" class="btn btn-primary btn-sm centerBtn">Centrer</button>
  <div id="map_canvas1"></div>

  <!--div v-on:click="markerMap" id="map_canvas1"></div>
    <input type="text" id="lngFld">
  <input type="text" id="latFld"-->
</div>


    <div class="slideAddNewBtn">
        <button v-if="isDisplayed" v-on:click="show"><img class="btnAjt" src="./img/AddBtn.png" alt=""/></button>
    </div>
    <!--<div>
            <button v-on:click="show"><img class="btnAjt" src="../AddBtn.png" alt=""/></button>
        </div>
    </div>-->
    <div id="map"></div>
    
        <div v-if="isDisplayed" class="slideInfo">
            <div>
            <div id="divBtnBack"  class="col-xs-2">
                <img v-on:click="backBtn" class="stylePhoto backBtn" id="BackBtn" alt="Fermeture de la slide" src="img/Ge-Soif-Glyphicons/BackBtn.png">
            </div>
            <div id="divDirections"  class="col-xs-2">
                <img v-on:click="directions" class="stylePhoto directions" id="Directions" alt="Bouton d'itinéraire" src="img/directions.png">
            </div>
            <div id="imgProvisoire"  class="col-xs-2">
                <img v-on:click="imgProvisoire" class="stylePhoto imgProvisoire" id="ImgProvisoire" alt="Image remplaçant la photo de fontaine" src="img/geSoifMarker.gif">
            </div>
        </div>
        <p name="address" id="address">{{address}}</p> 
        <div class="traitHorizontal"></div>
    </div>
    
    
    <script src="bs/js/bootstrap.min.js" type="text/javascript"></script>
    <?php
//show the correct modal if there was an error
    if (isset($error['login'])) {
        echo "<script>$('#connexionModal').click()</script>";
    }
    ?>
</body>
</html>
