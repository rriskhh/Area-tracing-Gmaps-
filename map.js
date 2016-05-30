
var map;
var geocoder;
var infoWin;
var service;
/******************
*
*	Variables for  Home
*/
var center_loc;
var marker_created;
var polyline_created;
var point_latlng;
var new_area_created_name;
/***************
*
*	Window Load;
*/
window.onload = function(){
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {lat:28.5245787,lng:77.20661500000006},
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	service = new google.maps.places.PlacesService(map);
	geocoder = new google.maps.Geocoder();
	infoWin = new google.maps.InfoWindow;
	center_loc = "Saket";	//Default Center Location of Map
	document.getElementById('set_center_loc').addEventListener('click',function(){
		set_center_location(document.getElementById('center_loc').value);
	});
	document.getElementById('draw_new_area').addEventListener('click',function(){
		draw_new_area(document.getElementById('new_area_name').value);
	});
	document.getElementById('delete_area').addEventListener('click',function(){
		delete_selected_area(document.getElementById('area_name').value);
	});
	document.getElementById('undo').addEventListener('click',function(){
		undo();
	});
	document.getElementById('clear_search').addEventListener('click',function(){
		clear_search();
	});
	document.getElementById('save_area').addEventListener('click',function(){
		save_area(document.getElementById('area_name'));
	});
	document.getElementById('saved_area').addEventListener('click',function(){
		window.location  = "saved_maps.php";
	});

};
/*****************************
*
*	Set Center Location of Map;
*/
function set_center_location(center_loc_text){
	if(center_loc_text == "")
		return;
	center_loc = center_loc_text;
	geocoder.geocode({'address':center_loc},function(result,status){
		map.setCenter(result[0].geometry.location);
	});
}
/***************************
*
*	Delete Selected Area;
*/
function delete_selected_area(delete_area_name){
	$.ajax({
                type: "POST",
                url: "delete_area.php",
                data: {d_name :delete_area_name},
                success: function(response){
                  $('#result').html(response);
                }
     });

	var x = document.getElementById('area_name');
	x.remove(x.selectedIndex);
}
/***************************
*
*	Draw New Area;
*/
function draw_new_area(new_area_name){
	if(new_area_name  == "")
		return;
	new_area_created_name = new_area_name;
	marker_created = [];
	polyline_created = [];
	point_latlng = [];
	/***************
     *
     * Make Buttons Visible;
   	 */
     document.getElementById('undo').style.display = 'inline';
     document.getElementById('save_area').style.display = 'inline';
     document.getElementById('clear_search').style.display = 'inline';
     document.getElementById('draw_new_area').disabled = 'disabled';
     /****************
     *
     *	Enable Click Event On Map;
     */
     google.maps.event.addListener(map,'click',function(e){
     	var clicked_point = {lat: e.latLng.lat(), lng:e.latLng.lng()};
     	point_latlng.push(clicked_point);
     	var marker = new google.maps.Marker({
         	animation:google.maps.Animation.DROP,
            icon:'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
            map: map,
            position: clicked_point
         });        
     	marker_created.push(marker);
     	/*****************
     	*
     	*	Marker Clicked;
     	*/
     	google.maps.event.addListener(marker,'click',function(){
     		if(point_latlng.length > 1 && marker.getPosition().lat() == point_latlng[0]['lat']){
     			//Manually Complete Polygon;
     			save_area(document.getElementById('area_name'));
     			return;
     		}
     		alert('Invalid Choice!');
     	});
     	/*****************
     	*
     	*	Create Polyline;
     	*/
     	if(point_latlng.length > 1){
     		var polyline = new google.maps.Polyline({
     			path: [point_latlng[point_latlng.length - 1],point_latlng[point_latlng.length - 2]],
     			geodesic: true,
     			strokeColor: 'FF0000',
     			strokeWeight: 2
     		});
     		polyline.setMap(map);
     		polyline_created.push(polyline);
     	}
     });
	return;
}
/*******************
*
*	Undo Last Action;
*/
function undo(){
	if(marker_created.length == 0){
		alert("Nothing to Undo!");
		return;
	}
	if(polyline_created.length > 0){
		polyline_created[polyline_created.length - 1].setMap(null);
		polyline_created.pop();
	}
	marker_created[marker_created.length - 1].setMap(null);
	marker_created.pop();
	point_latlng.pop();
	return;
}
/******************
*
*	Clear Function;
*/
function clear_search(){
	while(polyline_created.length > 0)
		polyline_created.pop().setMap(null);
	while(marker_created.length > 0){
		marker_created.pop().setMap(null);
		point_latlng.pop();
	}
	/***************
	*
	*	Hide Buttons;
	*/
	document.getElementById('undo').style.display = 'none';
    document.getElementById('save_area').style.display = 'none';
    document.getElementById('clear_search').style.display = 'none';
    document.getElementById('draw_new_area').disabled = false;
    document.getElementById('new_area_name').value = "";      
	return;
}
/*****************
*
*	Save New Area;
*/
function save_area(dropdown){
	/*************
	*
	*	Add to Dropdown;
	*/
	var option = document.createElement('option');
	option.text = new_area_created_name;
	dropdown.add(option);
	if(point_latlng.length <= 2){
		alert('No Area Selected');
		return;
	}
	/*************
	*
	*	Create Polyline for last and first coordinates
	*/
	var last_polyline = new google.maps.Polyline({
     			path: [point_latlng[point_latlng.length - 1],point_latlng[0]],
     			geodesic: true,
     			strokeColor: 'FF0000',
     			strokeWeight: 2
     });
     last_polyline.setMap(map);
     /****************
     *
     *	Store Area Coordinates
     */
     for(var i = 0;i<point_latlng.length;++i){
	     $.ajax({
    	 	type: 'POST',
     		url: 'insert_coordinates.php',
     		data: {area_name:new_area_created_name, num: i+1, lat_coord: point_latlng[i]['lat'].toString(), lng_coord: point_latlng[i]['lng'].toString()},
     		success: function(){
     			$('#result').html(response);
     		}
     	});
	}
	find_restaurant();	
 }
 /****************
 *
 *	Locate Restaurants;
 */
 function find_restaurant(){
 	for(var i = 0;i<point_latlng.length;++i){
 		document.getElementById('demo').innerHTML = "here!";
 		service.nearbySearch({
 			location: point_latlng[i],
 			radius: 300,
 			type: ['restaurant']
 		},callback);
 	}
 }
/****************
*
*	Save Restaurants;
*/
function callback(results,status){
	var result;
	for(var j = 0,result;result = results[j];++j){
		var restaurant_marker = new google.maps.Marker({
			position: result.geometry.location,
			map: map
		});
		$.ajax({
			type: 'POST',
			url: 'insert_restaurant.php',
			data: {rest_name: result.name, area_name: new_area_created_name, lat_coord: restaurant_marker.getPosition().lat().toString(), lng_coord: restaurant_marker.getPosition().lng().toString()},
			success: function(){
				$('#result').html(response);
			}
		});
	}
}
