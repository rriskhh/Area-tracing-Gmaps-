<?php include "distinct_area_name.php"; ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Create New Area</title>
		<script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src = "map.js"></script>
		<link rel ="stylesheet" type="text/css" href="styling.css" />
	</head>
	<body>
		<div id="floating-panel">
          <input type="text" placeholder="Center Location" id="center_loc" />
          <input type="submit" value="Set Center" id="set_center_loc" >
          <input type="text" placeholder="Enter Area Name" id="new_area_name" />
	      <input type="submit" value="Draw" id="draw_new_area" >
          <input type="submit" value="Undo" id="undo" style="display:none;" >
	      <input type="submit" value="Auto Save" id="save_area" style="display:none;">
	      <input type="submit" value="Clear" id="clear_search" style="display:none;">
 		</div>
   	 	<div id="map"></div>
   	 	<div id="box">
	      <input type="submit" value="View Saved Area(s)" id="saved_area" >
    	  <br>
    	  <select id = "area_name">
    	  <?php
    	  		foreach($distinct_area_name as $x)
    	  			echo "<option>".$x."</option>";
    	  ?>
    	  </select>
    	  <input type="submit" value="Delete Area" id="delete_area" >
          <br>
      	  <p id="demo">Default Center :: Saket</p>
      	 </div>
	</body>
</html>