<?php
include "libreria.php";
$con=connection("partite");

$squadra = json_decode($_POST["data"]);

$sql="SELECT DISTINCT home FROM `incontri` WHERE squadra = '$squadra' UNION SELECT DISTINCT visitor FROM `incontri` WHERE squadra = '$squadra'";
echo(json_encode(eseguiQuery($con,$sql)));
?>