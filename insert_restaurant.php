<?php
	include "database_connect.php";
	$query = "insert into restaurant values('".$_POST['rest_name']."','".$_POST['area_name']."','".$_POST['lat_coord']."','".$_POST['lng_coord']."')";
	$result = mysql_query($query);
?>