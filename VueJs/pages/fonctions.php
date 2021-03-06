<?php

function MustBeAdmin() {
    return (isset($_SESSION['user_infos']) && $_SESSION['user_infos']['admin']);
}

/** Fonction de debug
 * -------------------
 * @param type $var
 */
function var_dump_pre($var) {
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
}

/**
 * Fonction pour donner les extensions aux images importées
 * ---------------------------------------------------------
 * @param type $type type donnée par $_FILE
 * @return string un string contenant l'extension
 */
function get_image_format_file($type) {
    $format = "";

    switch ($type) {
        case 'image/png':
            $format = '.png';
            break;
        case 'image/jpeg':
            $format = '.jpg';
            break;
        case 'image/gif':
            $format = '.gif';
            break;
        case 'image/bmp':
            $format = '.bmp';
            break;
        case 'image/vnd.microsoft.icon':
            $format = '.ico';
            break;
        case 'image/tiff':
            $format = '.tif';
            break;
        case 'image/svg+xml':
            $format = '.svg';
            break;
    }

    return $format;
}

/**
 * Test si le nom donné est un dossier
 * @param string $dir lien du dossier
 * @return bool
 */
function dir_exist($dir) {
    return file_exists($dir) && is_dir($dir);
}

function put_dirfile_array($path) {
    $array = "";
    $i = 0;

    if ($dossier = opendir($path)) {
        while (false !== ($file = readdir($dossier))) {
            if ($file != "." && $file != ".." && $file != ".DS_Store") {
                $array[$i] = $file;
                $i++;
            }
        }

        closedir($dossier);
    }

    return $array;
}

/* * ********************************** FONCTIONS EN LIEN AVEC LA BASE DE DONNEÉ ************************************** */



/* * ************************************************* PAGE INDEX ******************************************************* */

/**
 * Fonction de connexion a la base de donnée a l'aide de parametre
 * ----------------------------------------------------------------
 * @return type : return a connection PDO
 */
function db_connect() {
    static $myDb = null;

    if ($myDb === null) {
        try {
            $connectionString = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8';
            $myDB = new PDO($connectionString, DB_USER, DB_PWD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false));
        } catch (Exception $e) {
            die("Impossible d'ouvrir la base de donnée: " . $e->getMessage());
        }
    }
    return $myDB;
}

/**
 * Test si l'utilisateur peux se connecter
 * @param string $pseudo
 * @param tystringpe $mdp
 * @return array|false return false or the array of the user
 */
function check_login($identifier, $password) {
    static $req = null;

    if ($req == null) {
        $req = db_connect()->prepare('SELECT * FROM t_user WHERE identifier = ? AND password = ?');
    }

    $req->execute([$identifier, sha1($password)]);
    while ($line = $req->fetch(PDO::FETCH_ASSOC)) {
        return $line;
    }

    return false;
}

/** Fonction qui recupere une personne en spécifiant un ID
 * ------------------------------------------------------
 * @param int $id
 * @return array|false return user or faése if doesn't exist
 */
function get_user_by_id($id) {

    static $req = null;

    if ($req == null) {
        $req = db_connect()->prepare('SELECT * FROM t_user WHERE id = ?');
    }

    $req->execute([$id]);
    while ($line = $req->fetch(PDO::FETCH_ASSOC)) {
        return $line;
    }
    return false;
}

/* * Fonction qui récupère les utilisateurs
 * ---------------------------------------
 * @return array type Tableaux multidimensionnel
 */

function get_users() {
    static $req = null;

    if ($req == null) {
        $req = db_connect()->prepare('SELECT id, identifier, email, admin, active FROM t_user ORDER BY identifier');
    }

    $req->execute([$id]);

    $array = [];
    while ($line = $req->fetch(PDO::FETCH_ASSOC)) {
        $array[] = $line;
    }
    return false;
}

/* * Fonction qui insert une personne dans la table
 * -----------------------------------------------
 * @param string $identifier
 * @param string $email
 * @param string $identifier
 * @param string $password
 * @param string $admin
 * @param string $active
 * @return bool
 */

function add_user($identifier, $email, $password, $admin, $active) {
    static $req = null;

    if ($req == null) {
        $req = db_connect()->prepare("INSERT INTO t_user(identifier, email, password, admin, active) VALUES (?, ?, ?, ?, ?)");
    }

    try {
        $req->execute([$identifier, $email, sha1($password), $admin, $active]);
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return true;
}

/**
 * Modifie le mot de pass d'un utilisateur
 * @param int $id
 * @param string $newPassword
 * @return boolean
 */
function modif_user_password($id, $newPassword) {
    static $req = null;

    if ($req == null) {

        $req = db_connect()->prepare('UPDATE t_user SET password = ? WHERE id = ?');
    }

    try {
        $req->execute([$newPassword, sha1($id)]);
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return true;
}

/**
 * Modifie l'e-mail d'un utilisateur
 * @param int $id
 * @param string $newEmail
 * @return boolean
 */
function modif_user_email($id, $newEmail) {
    static $req = null;

    if ($req == null) {

        $req = db_connect()->prepare('UPDATE t_user SET email = ? WHERE id = ?');
    }

    try {
        $req->execute([$newEmail, sha1($id)]);
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return true;
}

/**
 * Modifie l'état admin d'un utilisateur
 * @param int $id
 * @param bool $isAdmin
 * @return boolean
 */
function modif_user_admin($id, $isAdmin) {
    static $req = null;

    if ($req == null) {

        $req = db_connect()->prepare('UPDATE t_user SET admin = ? WHERE id = ?');
    }

    try {
        $req->execute([$isAdmin, sha1($id)]);
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return true;
}

/**
 * Modifie l'état actif d'un utilisateur
 * @param int $id
 * @param bool $isActive
 * @return boolean
 */
function modif_user_active($id, $isActive) {
    static $req = null;

    if ($req == null) {

        $req = db_connect()->prepare('UPDATE t_user SET active = ? WHERE id = ?');
    }

    try {
        $req->execute([$isActive, sha1($id)]);
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return true;
}

/**
 * Supprime un utilisateur
 * @param type $id
 * @return boolean
 */
function delete_user($id) {
    static $req = null;

    if ($req == null) {
        $req = connectDB()->prepare("DELETE FROM t_user WHERE id = ?");
    }

    try {
        $req->execute([$id]);
    } Catch (Exception $e) {
        return false;
    }

    return true;
}

/* * **************************************** PAGE AFFICHER FONTAINES *************************************** */

/**
 * Fonction qui recupere toutes les fontaines de la base
 * ------------------------------------------------------
 * @return array Tableaux multidimensionnel
 */
function get_fountains($swLat = 0, $swLng = 0, $neLat = 0, $neLng = 0) {

    $req = db_connect()->prepare('SELECT * FROM `t_fountain`');
    /* $req = db_connect()->prepare('SELECT * FROM `t_fountain` WHERE latitude BETWEEN :swLat AND :neLat AND longitude BETWEEN :swLng AND :neLng AND active = 1');
      $req->bindParam(':swLat', $swLat);
      $req->bindParam(':swLng', $swLng);
      $req->bindParam(':neLat', $neLat);
      $req->bindParam(':neLng', $neLng); */

    $req->execute();


    $array = [];
    while ($line = $req->fetch(PDO::FETCH_ASSOC)) {
        $array[] = $line;
    }
    return $array;
}

/**
 * Fonction qui recupere toutes les fontaines de la base
 * ------------------------------------------------------
 * @return array Tableaux multidimensionnel
 */
function get_fountains_admin($active) {

    $req = db_connect()->prepare('SELECT * FROM `t_fountain` WHERE active = :active');
    $req->bindParam(':active', $active);

    $req->execute();


    $array = [];
    while ($line = $req->fetch(PDO::FETCH_ASSOC)) {
        $array[] = $line;
    }
    return $array;
}

/**
 * test si une fontaine exist déjà en fonction de l'adresse
 * @param string $address
 * @return boolean
 */
function did_fountain_exist($address) {

    $req = null;

    if ($req == null) {
        $req = db_connect()->prepare("SELECT count(idFountain) as Count FROM t_fountain WHERE address = ?");
    }

    $req->execute([$address]);
    while ($res = $req->fetch(PDO::FETCH_ASSOC)) {
        if ($res['Count'] > 0) {
            return true;
        }
    }
    return false;
}

/**
 * Modifie l'état actif d'une fontaine
 * @param int $id
 * @param bool $isActive
 * @return boolean
 */
function modif_fountain_active($id, $isActive) {
    static $req = null;

    if ($req == null) {

        $req = db_connect()->prepare('UPDATE t_fountain SET active = ? WHERE idFountain = ?');
    }

    try {
        $req->execute([$isActive, $id]);
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return true;
}

/**
 * Ajoute +1 au one less plastic bottle
 * @param int $id id de la fontaine
 * @return int|boolean le nombvre actuel de olpb | false
 */
function add_one_less_plastic_bottle($idFountain) {

    static $req = null;
    static $reqOlpb = null;

    //get current olpb
    if ($req == null) {
        $req = db_connect()->prepare('SELECT olpb FROM t_fountain WHERE idFountain = :id');
        $req->bindParam(':id', $idFountain, PDO::PARAM_INT);
    }
    $req->execute();
    $result = $req->fetch(PDO::FETCH_ASSOC);
    $newOlpb = $result["olpb"] + 1;

    //+1 olpb
    if ($reqOlpb == null) {
        $reqOlpb = db_connect()->prepare('UPDATE t_fountain SET olpb = :newOlpb WHERE idFountain = :id');
        $reqOlpb->bindParam(':newOlpb', $newOlpb, PDO::PARAM_INT);
        $reqOlpb->bindParam(':id', $idFountain, PDO::PARAM_INT);
    }
    try {
        $reqOlpb->execute();
    } catch (Exception $e) {
        return false;
    }
    return $newOlpb;
}

function get_olpb($idFountaine) {
    static $req = null;
    static $reqOlpb = null;

    //get current olpb
    if ($req == null) {
        $req = db_connect()->prepare('SELECT olpb FROM t_fountain WHERE idFountain = :id');
        $req->bindParam(':id', $idFountaine, PDO::PARAM_INT);
    }
    $req->execute([$idFountaine]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result["olpb"];
}

/**
 * Supprime une fontaime
 * @param type $id
 * @return boolean
 */
function delete_fountain($id) {
    static $req = null;

    if ($req == null) {
        $req = db_connect()->prepare("DELETE FROM t_fountain WHERE idFountain = ?");
    }

    try {
        $req->execute([$id]);
    } Catch (Exception $e) {
        return false;
    }

    return true;
}

/**
 * Retourn le chemin de l'image d'une fontaine grace a son id
 * @param int $id
 * @return boolean
 */
function get_fountain_image_path_by_id($id) {

    $path = "./img/fountains/$id.";
    $extensions = ["png", "jpg", "jpeg"];
    foreach ($extensions as $e) {
        if (file_exists($path . $e)) {
            return $path . $e;
        }
    }

    return "./img/fountains/default.png";
}

function delete_fountain_image($id) {

    $path = get_fountain_image_path_by_id($id);

    if (!preg_match("#default#", $path)) {
        unlink($path);
        return true;
    }
    return false;
}

/**
 * D'après un tableau ecrire des input type hidden pour pouvoir passer les valeurs entre javascript et php
 * --------------------------------------------------------------------------------------------------------
 * @param type $array
 * @return string
 */
/* function instancier_tableau_javascript($array) {
  $affichage = '<input type="hidden" id="nb_items" class="lat" value="' . count($array) . '" />';

  for ($i = 0; $i < count($array); $i++) {
  if ($array[$i]["active"] == 1) {


  $affichage .= '<input type="hidden" id="id_fontaine_' . $i . '" class="lat" value="' . $array[$i]["idFountain"] . '" />';
  $affichage .= '<input type="hidden" id="lat_' . $i . '" class="lat" value="' . $array[$i]["latitude"] . '" />';
  $affichage .= '<input type="hidden" id="lng_' . $i . '" class="lng" value="' . $array[$i]["longitude"] . '" />';
  $affichage .= '<input type="hidden" id="olpb_' . $i . '" class="olpb" value="' . $array[$i]["olpb"] . '" />';
  $affichage .= '<input type="hidden" id="title_' . $i . '" class="olpb" value="' . $array[$i]["title"] . '" />';
  $file = glob("./img/fountains/" . $array[$i]["idFountain"] . ".*");

  if (!empty($file)) {
  $affichage .= '<input type="hidden" id="photo_fontaine_' . $i . '" class="lng" value="' . $file[0] . '" />';
  $affichage .= '<input type="hidden" id="nom_photo_' . $i . '" class="lng" value="' . $file[0] . '" />';
  } else {
  $affichage .= '<input type="hidden" id="photo_fontaine_' . $i . '" class="lng" value="' . "./img/fountains/default.jpg" . '" />';
  $affichage .= '<input type="hidden" id="nom_photo_' . $i . '" class="lng" value="' . "./img/fountains/default.jpg" . '" />';
  }
  }
  }

  return $affichage;
  } */

/* * **************************************** PAGE AJOUT FONTAINES *************************************** */

/**
 * Ajoute une fontaine da la base de données
 * @staticvar null $req
 * @param string $title
 * @param float $latitude
 * @param flaot $longitude
 * @param float $active
 * @return int|boolean lastID added in the DB | false
 */
function add_fountain($latitude, $longitude, $active, $image) {
    static $req = null;
    $time = date("Y-m-d H:i:s");

    $bdd = db_connect();

    if ($req == null) {
        $req = $bdd->prepare("INSERT INTO t_fountain(latitude, longitude,time, active, img) VALUES (:latitude, :longitude, :time, :active, :image)");
    }
    $req->bindParam(":latitude", $latitude);
    $req->bindParam(":longitude", $longitude);
    $req->bindParam(":time", $time);
    $req->bindParam(":active", $active, PDO::PARAM_INT);
    $req->bindParam(":image", $image, PDO::PARAM_STR);
    try {
        $req->execute();
    } catch (Exception $e) {
        //echo $e;
        return false;
    }

    return $bdd->lastInsertId();
}

/* function add_fountain($title, $latitude, $longitude, $address, $active, $image) {
  static $req = null;

  $bdd = db_connect();

  if ($req == null) {
  $req = $bdd->prepare("INSERT INTO t_fountain(title, latitude, longitude, address, active, img) VALUES (:title, :latitude, :longitude, :address, :active, :image)");
  }
  $req->bindParam(":title", $title, PDO::PARAM_STR);
  $req->bindParam(":latitude", $latitude);
  $req->bindParam(":longitude", $longitude);
  $req->bindParam(":address", $address, PDO::PARAM_STR);
  $req->bindParam(":active", $active, PDO::PARAM_INT);
  $req->bindParam(":image", $image, PDO::PARAM_STR);
  try {
  $req->execute();
  } catch (Exception $e) {
  //echo $e;
  return false;
  }

  return $bdd->lastInsertId();
  } */

/**
 * Verifie et ajoute l'image d'une fontaine dans le dossié prévu à cette effet
 * @param int $id
 * @param array $file
 * @return boolean
 */
function add_Fountain_image($file) {
    if (preg_match('#^.+\.(png|jpg|jpeg)$#', strtolower($file['name']), $matches)) {
        $path = "../img/img_test/".$file["name"];
        return move_uploaded_file($file['tmp_name'], $path);
    }
}

/* * **************************************** PAGE GESTION UTILISATEURS *************************************** */

/** Fonction pour afficher les utilisateurs
 * ------------------------------------------
 * @param type $array
 * @return string
 */
function show_fountains($array, $mode) {
    $affichage = "";
    $affichage .= '<table class="table table-responsive">';
    $affichage .= '<tr>';
    $affichage .= '<th>Numéro de la fontainte</th>';
    $affichage .= '<th>Adresse</th>';
    $affichage .= '<th>Nom</th>';
    $affichage .= '<th>Date</th>';
    $affichage .= '<th>Image</th>';
    $affichage .= '<th> Voir sur la carte</th>';
    $affichage .= '<th>Action</th>';
    $affichage .= '</tr>';
    for ($i = 0; $i < count($array); $i++) {
        if ($array[$i]['active'] == $mode) {
            $affichage .= "<tr>";
            $affichage .= "<td>" . $array[$i]["idFountain"] . "</td>";
            $affichage .= "<td>" . $array[$i]["address"] . "</td>";
            $affichage .= "<td>" . $array[$i]["title"] . "</td>";
            $affichage .= "<td>" . $array[$i]["time"] . "</td>";
            $affichage .= "<td><img src='./img/fountains/" . $array[$i]["img"] . "' class='img-thumbnail' alt='Image Fontaine' width='50' height='50'/></td>";
            $affichage .= "<td>";
            $affichage .= "<a href='index.php?mode=validation&latlng=" . $array[$i]["latitude"] . "," . $array[$i]["longitude"] . "'>";
            $affichage .= "<span class='glyphicon glyphicon-search'></span>";
            $affichage .= "</a>";
            $affichage .= "</td>";

            if ($mode == 0) {/* si desactivée */
                $affichage .= "<td><a href='valider_fontaine.php?id=" . $array[$i]["idFountain"] . "&mode=1'><span class='glyphicon glyphicon-ok' title='Valider'></span></a>&nbsp;&nbsp;";
                $affichage .= "<a href='supprimer_fontaine.php?id=" . $array[$i]["idFountain"] . "'><span class='glyphicon glyphicon-trash' title='Supprimer'></span></a></td>";
            } else {//si activée
                $affichage .= '<td><a href="valider_fontaine.php?id=' . $array[$i]["idFountain"] . '&mode=0"><span class="glyphicon glyphicon-remove" title="Désactiver"></span></a>&nbsp;&nbsp;';
                $affichage .= "<a href='supprimer_fontaine.php?id=" . $array[$i]["idFountain"] . "'><span class='glyphicon glyphicon-trash' title='Supprimer'></span></a></td>";
            }

            $affichage .= "</tr>";
        }
    }
    $affichage .= "</table>";
    return $affichage;
}

function affiche_utilisateur($array) {
    $affichage = "";
    $affichage = '<div class="liste_utilisateurs">';
    $affichage .= '<div id="en_tete"><div class="cellule">N° Utilisateur</div><div class="cellule">Nom / Admin</div><div class="cellule">Action</div></div>';

    for ($i = 0; $i < count($array); $i++) {
        $class = "ligne_clair";


        $affichage .= '<div class="' . $class . '">';
        $affichage .= '<div class="cellule">' . $array[$i][0] . '</div>';

        if ($array[$i][2]) {
            $est_admin = 'ADMIN';
            $action = '<a href="changer_admin.php?id=' . $array[$i][0] . '&mode=0">✍</a><a href="supprimer_utilisateur.php?id=' . $array[$i][0] . '">x</a>';
        } else {
            $est_admin = 'PAS ADMIN';
            $action = '<a href="changer_admin.php?id=' . $array[$i][0] . '&mode=1">✍</a><a href="supprimer_utilisateur.php?id=' . $array[$i][0] . '">x</a>';
        }


        $affichage .= '<div class="cellule">' . $array[$i][1] . ' / ' . $est_admin . '</div>';
        $affichage .= '<div class="cellule">';
        $affichage .= $action;
        $affichage .= '</div>';
        $affichage .= '</div>';
    }

    $affichage .= "</div>";

    return $affichage;
}

?>
