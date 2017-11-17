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
            <li class="nav navbar-form navbar-left" aria-label="Left Align" ><a href="./about.php" style="color : white"><span class="glyphicon glyphicon-info-sign" aria-hidden="true" ></span> A propos</a></li>
        </div>
        <!--img id="btnShowAddFountain" alt="Ajouter une fontaine" src="./img/Ge-Soif-Glyphicons/AddBtn.png"/>
        <!--/.nav-collapse -->
    </div>
</nav><!--./navbar-->
