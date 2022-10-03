<?php

include "libreria.php";
$con=connection("partite");
$sql="Select DISTINCT campo from incontri";
echo(json_encode(eseguiQuery($con,$sql)));
?>