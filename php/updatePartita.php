<?php 
include "libreria.php";
$con = connection("partite");
$datas = $_POST["datas"];
$datas = json_decode($datas);
eseguiQuery($con , "UPDATE incontri SET data = $datas->data, ora = $ora, squadra = $datas->squadra, casa_trasferta = $datas->casa_trasferta, campo = $datas->campo, home = $datas->home, visitor = $datas->visitor 
WHERE id = $datas->id");
?>
