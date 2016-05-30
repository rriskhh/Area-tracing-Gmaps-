<?php 
  include "all_details.php"; 
  //include "distinct_area_name.php";
   ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Saved Areas Area</title>
		<script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script>
      var area_latitude = <?php echo json_encode($all_lat); ?>;
      var area_longitude = <?php echo json_encode($all_lng); ?>;
      var rest_latitude = <?php echo json_encode($all_rest_lat); ?>;
      var rest_longitude = <?php echo json_encode($all_rest_lng); ?>;
      var rest_name = <?php echo json_encode($all_rest_name); ?>;
      var distinct_area_name = <?php echo json_encode($distinct_area_name); ?>;
    </script>
    <script src ="saved.js"></script>
		<link rel ="stylesheet" type="text/css" href="styling.css" />
	</head>
	<body>
		<div id="floating-panel">
        <select id = "area_name">
        <?php
            foreach($distinct_area_name as $x)
              echo "<option>".$x."</option>";
        ?>
        </select>
 		</div>
   	 	<div id="map"></div>
   	 	<div id="box">
    	  <input type="submit" value="Home" id="home" >
          <br>
      	  <p id="demo">Default Center :: Saket</p>
      	 </div>
	</body>
</html>