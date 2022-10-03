<?php

include "libreria.php";
$con=connection("partite");
$sql="Select DISTINCT squadra from incontri";
echo(json_encode(eseguiQuery($con,$sql)));
?>