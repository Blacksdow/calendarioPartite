<?php 
include "libreria.php";
$con = connection("partite");

$data = json_decode($_POST["data"]);

eseguiQuery($con , "UPDATE incontri SET data = '$data->data', ora = '$data->ora', squadra = '$data->squadra', casa_trasferta = '$data->casa_trasferta', campo = '$data->campo', home = '$data->home', visitor = '$data->visitor', note = '$data->note'
WHERE id = '$data->id'");

//eseguiQuery($con , "UPDATE incontri SET data = '$data', ora = '$ora', squadra = '$squadra', casa_trasferta = '$casa_trasferta', campo = '$campo', home = '$home', visitor = '$visitor', note = '$note'
//WHERE id = '$id'");
?>
