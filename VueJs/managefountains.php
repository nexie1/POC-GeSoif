<?php
session_start();

include("pages/mysql.inc.php");
include("pages/fonctions.php");

$identifier = isset($_POST['identifier']) ? htmlspecialchars($_POST['identifier']) : "";
$password = isset($_POST['password']) ? htmlspecialchars($_POST['password']) : "";

//check login
if (isset($_POST['btnConnexion'])) {
    if ($userInfos = check_login($identifier, $password)) {
        $_SESSION['user_infos'] = $userInfos;
    } else {
        $error['login'] = "Identifiant ou mot de passe incorrects!";
    }
}

//get user infos if connected
$userInfos = isset($_SESSION['user_infos']) ? $_SESSION['user_infos'] : null;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bs/css/bootstrap.css">
        <link rel="stylesheet" href="MyGe-Soifcss.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://unpkg.com/vue"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script src="src/vue.js" type="text/javascript"></script>
        <script src="src/Ge-SoifVue.js" type="text/javascript"></script>
        <?php
        include("./Menu/meta.php");
        include("./templates/templateTableauFontaines.html");
        ?>
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Ge-Soif! Les fontaines d'eau potable à portée de main!</title>
        <!-- Bootstrap -->
        <link href="bs/css/bootstrap.min.css" rel="stylesheet">
        <!--Js maps-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!--script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzFsO8AkHwcYKvWN7mR4ilASmyJdTMtnU&callback=initMap&libraries=geometry"></script-->
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=geometry"></script>
        <script type="text/javascript" src="./javascript/vue.js"></script>
        <script type="text/javascript" src="javascript/admin.js?v=2"></script>
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <style>
            body {
                padding-top: 75px;
            }
        </style>
    </head>
    <body>
        <?php
//test if the user is connected and show the appropriate menu
        if ($userInfos == null) {
            include("./Menu/MenuDeco.php");
        } else {
            include("./Menu/MenuCo.php");
        }
        ?>

        <!--Content-->
        <?php
        if ($userInfos != null) {
            ?>
            <div id="unvalidfountains" class="container">
                <h3>Fontaines non validées</h3>
                <hr>
                <demo-grid
                    :data="Fountains">
                </demo-grid>
                </hr>
            </div>
            <div id="validfountains" class="container">	
                <h3>Fontaines validées</h3>
                <hr>
                <demo-grid
                    :data="Fountains">
                </demo-grid>
                <hr>

            <?php
            } else {
                echo "vous devez être connectés pour afficher les informations de cette page";
                echo '<a id="connexionModal" data-toggle="modal" data-target="#Connexion" href="#Connexion" ><span class="glyphicon glyphicon-log-in"></span> Se connecter</a>';
            }
            ?>
            <?php
            include("Menu/footer.php");
            ?>
        </div>

        <!--Modal de connexion-->
        <div class="modal fade" tabindex="-1" role="dialog" id="Connexion">
            <div class="modal-dialog">
                <form method="post" action="#" class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Connexion</h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group has-feedback <?php echo isset($error['login']) ? 'has-error' : '' ?>">
                            <input type="text" class="form-control" name="identifier" placeholder="Identifiant" required value="<?php echo $identifier ?>">
                            <span class="glyphicon glyphicon-asterisk form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback <?php echo isset($error['login']) ? 'has-error' : '' ?>">
                            <input type="password" class="form-control" name="password" placeholder="Mot de passe" required>
                            <span class="glyphicon glyphicon-asterisk form-control-feedback"></span>
                        </div>
                        <?php
                        if (isset($error['login'])) {
                            echo '<span class="label label-danger">' . $error['login'] . '</span>';
                        }
                        ?>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-default" name="btnConnexion">Se connecter</button>
                    </div>
                </form><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!--./modal de connexion-->

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bs/js/bootstrap.min.js"></script>
        <?php
//show the correct modal if there was an error
        if (isset($error['login'])) {
            echo "<script>$('#connexionModal').click()</script>";
        }
        ?>
    </body>
</html>
