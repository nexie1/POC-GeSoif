<!--Navbar-->
<nav class="navbar navbar-light navbar-fixed-top" style="background-color: #2196f3">
    <div class="container" id="index">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a   v-bind:href="link"> <img id="iconNavbar" class="img-responsive" src="./img/faviconGlyphicon.png" alt="logo" /></a>
            <a class="navbar-brand"  v-bind:href="link" style="color : white;">{{message}}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">               
                <li ><a href="./pages/connexion/deconnexion.php"><span class="glyphicon glyphicon-log-out" style="color : white"></span> Se deconnecter</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" style="float: right;">               
                <li ><a href="./about.php"> A propos </a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav><!--./navbar-->
