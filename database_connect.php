<?php
	include “database_info.php”;
	$con = mysql_connect($id,$user,$pwd);
	     if(!$con)
		    die('Not Connected: ' . mysql_error());
	//echo 'Connection Establised';
	   $db = mysql_select_db($db_name,$con);
	   if(!$db)
		    die('Database Not Selected: ' . mysql_error());
?>