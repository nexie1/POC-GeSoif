<nav class= "navbar navbar-light navbar-fixed-top" style="background-color: #2196f3">
    <div class="container" id="index">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed aboutLink" data-toggle="collapse" aria-expanded="false"  style="color: white;">
                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
            </button>

            <a  v-bind:href="link"> <img class="littleImg" id="iconNavbar" src="./img/faviconGlyphicon.png" alt="logo" /></a>
            <a class="navbar-brand"  v-bind:href="link" style="color : white;">{{message}}</a>

        </div>
        <div id="navInfo" class="navbar-collapse collapse" style="float: right;">
            <ul>
              <li class="nav navbar-form navbar-left" aria-label="Left Align" ><a href="./about.php" style="color : white"><span class="glyphicon glyphicon-info-sign" aria-hidden="true" ></span> A propos</a></li>
              <div id="reseauxSociaux">
        </div>
        <div id="reseauxSociaux">
          <a href="https:\\www.facebook.com/genevasoif/"><img class="Imgsz" id="FbIcoone" alt="image" src="./img/facebook.png"/></a>
          <a href="https://www.instagram.com/gesoif_officiel/"><img class="Imgsz" id="InstIcoone" alt="image" src="./img/instagram.png"/></a>
          <a href="https://youtu.be/K3JngtvrcdI"><img class="Imgsz" id="YtbIcoone" alt="image" src="./img/youtube.png"/></a>
              </div>
        </div>
    </div>

</nav>

<div id="alert_template" class="alert alert_popup" v-bind:class="{ 'alert-danger': isDanger, 'alert-success': isSuccess, 'alert-info': isInfo}" v-on:click ="closed" v-if="isDisplay">
    <button class="close">×</button><span>{{message}}</span>
</div>
