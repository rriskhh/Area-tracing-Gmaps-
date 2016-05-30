<?php
	include "database_connect.php";
	$query = "insert into coordinates values(".intval($_POST['num']).",'".$_POST['area_name']."','".$_POST['lat_coord']."','".$_POST['lng_coord']."')";
	$result = mysql_query($query);
?>