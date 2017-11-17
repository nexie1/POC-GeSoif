<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include("./mysql.inc.php");
include("./fonctions.php");

//ajax call when clicking on the +1 button in the infowindow of an existing fountain
if (isset($_POST["olpbClickIdFountain"])) {

    $newOlpb = add_one_less_plastic_bottle($_POST["olpbClickIdFountain"]);
    echo $newOlpb;
}

//ajax call to get all active fountains from DB
//TODO DO NOT GET ALL Fountains from DB, just the ones around us...performance issue!!!!
if (isset($_POST["getFountains"])) {
    //TODO intégrer cette requête qui prend seulement les trucs dans une distance de 1 km
    //et ensuite rafraichir lors de zoom/pan de la map
    //SELECT *, ( 6371 * acos( cos( radians(46.19) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(6.14) ) + sin( radians(46.19) ) * sin( radians( latitude ) ) ) )
    //AS distance FROM t_fountain HAVING distance < 1 ORDER BY distance
    $fountains = get_fountains($_POST['swLat'], $_POST['swLng'], $_POST['neLat'], $_POST['neLng']);

    echo json_encode($fountains);
}
if (isset($_POST["getOlpb"])) {

    $olpb = get_olpb($_POST["getOlpb"]);
    echo json_encode($olpb);
}

//ajax call to insert a new fountain
if (isset($_GET['addFountain'])) {
    $title = isset($_POST['title']) ? htmlspecialchars($_POST['title']) : "";
    $latitude = isset($_POST['latitude']) ? htmlspecialchars($_POST['latitude']) : 'S';
    $longitude = isset($_POST['longitude']) ? htmlspecialchars($_POST['longitude']) : '';
    $address = isset($_POST['address']) ? htmlspecialchars($_POST['address']) : '';
   $image = isset($_FILES['imgFile']) ? $_FILES['imgFile'] : null;
    /*$image = $images[0];*/
    
    echo " voici l'image ". $image;

    //$image = ($image != "") ? json_decode($_POST['imgFile']) : null;
    //Verification
    if ($title == "" || strlen($title) > 80) {
        $title = "Fontaine d'eau";
    }

    if ($latitude == "" || $longitude == "" || $address == "") {
        $error['position'] = "Veuillez entrer une position correcte!";
    }else{
        $imageUniqueName = "default.png";
    if ($image['name'] != "") {
        $imageUniqueName = uniqid() . $image["name"];
        $image["name"] = $imageUniqueName;
    }
        }
        $lastId = 0;
        $lastId = add_fountain($title, $latitude, $longitude, $address, 0, $imageUniqueName);

    if (!isset($error) && $lastId > 0) {
            $result = add_Fountain_image($image);
        }
    }

	if(isset($_POST['getFountainsAdmin']))
	{
		$data = get_fountains_admin($_POST['active']);
		echo json_encode($data);
	}
