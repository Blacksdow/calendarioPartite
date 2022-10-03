<?php
include "libreria.php";
$con=connection("partite");

$sql="SELECT DISTINCT MONTH(data) as mesi FROM incontri;";
echo(json_encode(eseguiQuery($con,$sql)));
?>