<?php
session_start();

$option = array(
    "ssl"=>array(
        "verify_peer"=>false,
        "veirify_peer_name"=>false,
    ),
);

$searchQuery = $_GET['searchQuery'];
$valCategory = $_GET['valCategory'];

$json = file_get_contents('data.json', false, stream_context_create($option));
$resultats = json_decode($json, true);

$ingredients = array();

if ($searchQuery != null && $searchQuery != '') {
    foreach ($resultats as $rkey => $resource){

        if (strpos(strtolower($resource['name']), strtolower($searchQuery) ) !== false){
            $ingredients[] = $resource;
        }
    
    }
} 

if ($valCategory != null && $valCategory != '') {
    foreach ($resultats as $rkey => $resource){

        if (strpos($resource['category'], $valCategory ) !== false){
            $ingredients[] = $resource;
        }
    
    }
}

if (($searchQuery == null && $searchQuery == '' && $valCategory == null && $valCategory == '') || $valCategory === 'Tous') {
    $ingredients = $resultats;
}


echo "<table class='table table-striped'>";
foreach ($ingredients as $res) {
    echo "<tr>";
    echo "<td>".$res['name']."</td>";
    echo "<td>".$res['category']."</td>";
    echo "</tr>";
}
echo "</table>";






?>