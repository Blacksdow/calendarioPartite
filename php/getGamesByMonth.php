<?php
include "libreria.php";
$con=connection("partite");

$mese = json_decode($_POST["data"]);

if($mese != "Tutti i mesi" && $mese != null)
$sql="SELECT * FROM incontri WHERE MONTH(data) = '$mese'";
else
$sql="SELECT * FROM incontri";

echo(json_encode(eseguiQuery($con,$sql)));
?>