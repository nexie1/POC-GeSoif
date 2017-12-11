<nav class= "navbar navbar-light navbar-fixed-top" style="background-color: #2196f3">
    <div class="container" id="index">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed aboutLink" data-toggle="collapse" aria-expanded="false"  style="color: white;">
                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
            </button>

            <a  v-bind:href="link"> <img class="littleImg" id="iconNavbar" src="./img/faviconGlyphicon.png" alt="logo" /></a>
            <a class="navbar-brand"  v-bind:href="link" style="color : white;">{{message}}</a>
        <button v-on:click="centerButton" type="button" class="btn btn-primary btn-sm">Centrer</button>
        </div>
        <div id="navInfo" class="navbar-collapse collapse" style="float: right;">
            <ul>
            <li class="nav navbar-form navbar-left" aria-label="Left Align" ><a href="./about.php" style="color : white"><span class="glyphicon glyphicon-info-sign" aria-hidden="true" ></span> A propos</a></li></ul>
        </div>
  
            
    </div>
</nav>
<!--div class="alert alert-success alert_popupValid" v-on:click ="closed" id="alert_template" v-if="isDisplay">
    <button v-on:click ="closed" class="close">×</button><span>Merci ! Votre fontaine a bien été ajoutée. Un administrateur doit la valider pour qu'elle soit visible.</span>
 </div>
 
<div class="alert alert-danger alert_popupUnvalid" v-on:click ="closed" id="alert_template" v-if="isDisplay">
    <button v-on:click ="closed" class="close">×</button><span>Votre fontaine n'a pas été ajoutée.</span>
</div-->

<div id="alert_template" class="alert alert_popup" v-bind:class="{ 'alert-danger': isDanger, 'alert-success': isSuccess, 'alert-primary': isPrimary}" v-on:click ="closed" v-if="isDisplay">
    <button class="close">×</button><span>{{message}}</span>
</div>