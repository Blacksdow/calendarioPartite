<?php

include "libreria.php";
$con=connection("partite");
$sql="Select DISTINCT casa_trasferta from incontri";
echo(json_encode(eseguiQuery($con,$sql)));
?>