<?php
$option = array(
    "ssl"=>array(
        "verify_peer"=>false,
        "veirify_peer_name"=>false,
    ),
);

$json = file_get_contents('data.json'.$_get['idcategory'], false, stream_context_create($options));
$resultats = json_decode($json, true);

echo "<table class='table table-striped'>";
foreach ($resultats as $res) {
    echo "<tr>";
    echo "<td>".$res['name']."</td>";
    echo "<td>".$res['category']."</td>";
    echo "</tr>";
}
echo "</table>";


?>