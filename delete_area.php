<?php
	include "database_connect.php";
	$query  = "delete from coordinates where name='".$_POST['d_name']."'";
	$result = mysql_query($query);
	$query  = "delete from restaurant where name='".$_POST['d_name']."'";
	$result = mysql_query($query);

?>