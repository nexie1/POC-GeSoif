<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include("./mysql.inc.php");
include("./fonctions.php");

//ajax call when clicking on the +1 button in the infowindow of an existing fountain
if (isset($_REQUEST["olpbClickIdFountain"])) {

    $newOlpb = add_one_less_plastic_bottle($_REQUEST["olpbClickIdFountain"]);
    echo $newOlpb;
}

//ajax call to get all active fountains from DB
if (isset($_REQUEST["getFountains"])) {
    //TODO intégrer cette requête qui prend seulement les trucs dans une distance de 1 km
    //et ensuite rafraichir lors de zoom/pan de la map
    //SELECT *, ( 6371 * acos( cos( radians(46.19) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(6.14) ) + sin( radians(46.19) ) * sin( radians( latitude ) ) ) )
    //AS distance FROM t_fountain HAVING distance < 1 ORDER BY distance
    //$fountains = get_fountains($_REQUEST['swLat'], $_REQUEST['swLng'], $_REQUEST['neLat'], $_REQUEST['neLng']);
    $fountains = get_fountains();

    echo json_encode($fountains);
}
if (isset($_REQUEST["getOlpb"])) {

    $olpb = get_olpb($_REQUEST["getOlpb"]);
    echo json_encode($olpb);
}

//ajax call to insert a new fountain
if (isset($_REQUEST['addFountain'])) {
    $title = isset($_REQUEST['title']) ? htmlspecialchars($_REQUEST['title']) : "";
    $latitude = isset($_REQUEST['latitude']) ? htmlspecialchars($_REQUEST['latitude']) : 'S';
    $longitude = isset($_REQUEST['longitude']) ? htmlspecialchars($_REQUEST['longitude']) : '';
    $address = isset($_REQUEST['address']) ? htmlspecialchars($_REQUEST['address']) : '';
   $image = isset($_FILES['imgFile']) ? $_FILES['imgFile'] : null;
    /*$image = $images[0];*/
    
    echo " voici l'image ". $image;

    //$image = ($image != "") ? json_decode($_REQUEST['imgFile']) : null;
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

	if(isset($_REQUEST['getFountainsAdmin']))
	{
		$data = get_fountains_admin($_REQUEST['active']);
		echo json_encode($data);
	}
