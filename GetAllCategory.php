<?php
$option = array(
    "ssl"=>array(
        "verify_peer"=>false,
        "veirify_peer_name"=>false,
    ),
);

$json = file_get_contents('category.json',false, stream_context_create($options));
$category = json_decode($json, true);

echo "<select class='col-md-12 form-control text-center' id='lscategory' onchange = 'IngredientDunecategory(".$cat['idcategory'].")'>";
echo "<option>Tous</option>";

foreach ($category as $cat) {
    
    echo "<option value='".$cat['idcategory']."'selected>".$cat['name']."</option>";
   
}
echo "</select>";





?>