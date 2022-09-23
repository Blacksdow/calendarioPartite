<?php
include "libreria.php";
$con=connection("partite");
$sql="Select * from incontri";
echo(json_encode(eseguiQuery($con,$sql)));
?>
