<?php
		/*		
		*
			Developer :: rriskhh , Tuesday 7:39 PM
		*
		*/
	/*
		Old and New Coordinates, of dragged marker;
	*/
	$old = ($_POST['old_lng']);
	$new_lat = $_POST['new_lat'];
	$new_lng = $_POST['new_lng'];
	$con = mysql_connect('localhost','root','root');
	if(!$con)
		die('Not Connected: ' . mysql_error());
	//echo 'Connection Establised';
	$db = mysql_select_db('trial_week',$con);
	if(!$db)
		die('Database Not Selected: ' . mysql_error());
	$query = "update restaurant set lat='".$new_lat."',lng='".$new_lng."' where lng=".$old."";
	$result = mysql_query($query);
	if(!$result)
		die("Could Not Update Position: ".mysql_error());
	/*
		Store Changed Info;
	*/
	$updateFile = fopen("changes_made","a");
	$txt = "\nLocation Changed from (".$_POST['old_lng'].",".$old.") to (".$new_lat.", ".$new_lng.")";
	fwrite($updateFile,$txt);
	fclose($updateFile); 
?>