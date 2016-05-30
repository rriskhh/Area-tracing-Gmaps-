<?php
	include "distinct_area_name.php";
	/********************************
	*
	*	Coordinates of Area and Restaurants
	*/
	$all_lat = array();
	$all_lng = array();
	$all_rest_lat = array();
	$all_rest_lng  = array();
	$all_rest_name = array();

	/**********************
	*
	*	Coordinates of the Area;
	*/
	for($i = 0;$i<count($distinct_area_name);$i++){
		$temp1_array = array();
		$temp2_array = array();
		$query = "select * from coordinates where name='".$distinct_area_name[$i]."' order by id";
		$result = mysql_query($query);
		while($row=@mysql_fetch_assoc($result)){
			array_push($temp1_array, $row['lat']);
			array_push($temp2_array, $row['lng']);
		}
		array_push($all_lat,$temp1_array);
		array_push($all_lng, $temp2_array);
	}
	/*************************
	*
	*	Coordinates of Restaurants;
	*/
	for($i=0;$i< count($distinct_area_name);$i++){
      $temp1_array = array();
      $temp2_array = array();
      $temp3_array = array();
      $query = "Select * from restaurant where name = '".$distinct_area_name[$i]."'";
      $result = mysql_query($query);
      while($row=@mysql_fetch_assoc($result)){
        array_push($temp1_array, $row['lat']);
        array_push($temp2_array, $row['lng']);
        array_push($temp3_array,$row['rest_name']);
      }
        //echo count($temp1_array)."<br>".count($temp2_array)."<br>";
        array_push($all_rest_lat,$temp1_array);
        array_push($all_rest_lng,$temp2_array);
        array_push($all_rest_name,$temp3_array);
      }

?>