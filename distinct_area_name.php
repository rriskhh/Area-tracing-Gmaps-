<?php
	include "database_connect.php";
	$query = "select DISTINCT name from coordinates";
	$result = mysql_query($query);
	$distinct_area_name = array();
	while($row = mysql_fetch_assoc($result))
		array_push($distinct_area_name,$row['name']);
?>