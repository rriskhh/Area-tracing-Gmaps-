
var map;
var geocoder;
var infoWin;
var service;
/****************
*
*	Variable for Saved_Areas
*/
var inital_position;
var color = ['#FF0000','#1B39D3','#21E211','#E2DC11'];
var marker_link = ['http://maps.google.com/mapfiles/ms/icons/red-dot.png','http://maps.google.com/mapfiles/ms/icons/blue-dot.png','http://maps.google.com/mapfiles/ms/icons/green-dot.png','http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'];
window.onload = function(){
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {lat:28.5245787,lng:77.20661500000006},
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	service = new google.maps.places.PlacesService(map);
	geocoder = new google.maps.Geocoder();
	infoWin = new google.maps.InfoWindow;
	//document.getElementById('demo').innerHTML = area_latitude.length;
	document.getElementById('home').addEventListener('click',function(){
		window.location = "home.php";
	});
	document.getElementById('area_name').addEventListener('change',function(){
		view();
	});
	show_all_area();
	show_all_restaurants();
};
/*
*
* Show all Area;
*/
function show_all_area(){

        for(var i=0;i<area_latitude.length;++i){
          var coord = [];
          var lat_tm =area_latitude[i];
          var lng_tm = area_longitude[i];

          for(var j = 0;j<area_latitude[i].length;++j)
            coord.push({lat:parseFloat(lat_tm[j]), lng:parseFloat(lng_tm[j])});

          //document.getElementById('demo').innerHTML = coord.length;
          var poly = new google.maps.Polygon({
                paths: coord,
                strokeColor: color[i%4],
                strokeOpacity: 0.6,
                strokeWeight: 2,
                fillColor: color[i%4],
                fillOpacity: 0.2
                //editable: true
            });
            poly.setMap(map);
            poly.addListener('click',showCoordinates);
            //view();
       	 }
        return;
      }
     function show_all_restaurants(){
        //var latitude = <?php echo json_encode($all_rest_lat); ?>;
        //var longitude = <?php echo json_encode($all_rest_lng); ?>;
        //var rest_name = <?php echo json_encode($all_rest_name); ?>;
        //var total_reg = <?php echo json_encode($num_area); ?>;
        for(var i = 0;i<rest_latitude.length;++i){

          var names = rest_name[i];
          var lat_tm =rest_latitude[i];
          var lng_tm = rest_longitude[i];
          for(var j=0;j<rest_latitude[i].length;++j){
            add_rest_marker(i,{lat:parseFloat(lat_tm[j]),lng:parseFloat(lng_tm[j])} , names[j], distinct_area_name[i]);
            
          }
          //document.getElementById('demo').innerHTML = rest_name[0][1];
        }
      }
       function add_rest_marker(marker_color,rest_position,rest_name,area_name){
        var marker = new google.maps.Marker({
              draggable:true,
              animation:google.maps.Animation.DROP,
              map: map,
              icon: marker_link[marker_color%4],
              position: rest_position

             });
          google.maps.event.addListener(marker,'click',function(){
            infoWin.setContent("<b>" + rest_name + "</b><br>Coordinate: " + marker.getPosition() + "<br> <i>(Area Name : " + area_name + ")</i>");
            infoWin.open(map,this);
          });
          google.maps.event.addListener(marker,'dragstart',function(){
            inital_position = marker.getPosition();
          });
          google.maps.event.addListener(marker,'dragend',function(){
              //document.getElementById('demo').innerHTML = marker.getPosition().toString();
              $.ajax({
                  type: 'POST',
                  url: 'change_cord.php',
                  data: {old_lng: inital_position.lng().toString(), new_lat: marker.getPosition().lat().toString(), new_lng: marker.getPosition().lng().toString()},
                  success: function(){
                    $('#result').html(response);
                  }
              });
          });
          //document.getElementById('demo').innerHTML = inital_position['lat'].toString();
      }
      /*
      *
      * Set Center to Specified Area;
      */
      function view(){
        //document.getElementById('demo').innerHTML = "Here!";
        var x = document.getElementById('area_name');
        //document.getElementById('demo').innerHTML = 
        var select_lat = area_latitude[x.selectedIndex];
        var select_lng = area_longitude[x.selectedIndex];
        var low_x = parseFloat(select_lat[0]);
        var high_x = parseFloat(select_lat[0]);
        var low_y = parseFloat(select_lng[0]);
        var high_y = parseFloat(select_lng[0]); 
        for(var j = 1;j<select_lat.length;++j){
          if(low_y > parseFloat(select_lng[j]))
              low_y = parseFloat(select_lng[j]);
          if(high_y < parseFloat(select_lng[j]))
              high_y = parseFloat(select_lng[j]);
          if(low_x > parseFloat(select_lat[j]))
              low_x = parseFloat(select_lat[j]);
          if(high_x < parseFloat(select_lat[j]))
              high_x = parseFloat(select_lat[j]);
        }
        var center_x = low_x + ((high_x-low_x)/2);
        var center_y = low_y + ((high_y-low_y)/2);
        map.setCenter({lat:center_x,lng:center_y});  
        map.setZoom(15);
      }
   	

 		/*
			*  
      * Show Coordinates of Clicked Area;
  		*/
  		function showCoordinates(event){
	        var vertices = this.getPath();

        	var contentString = 'Selected Area <br><select>' +
            'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
            '<br>';

        // Iterate over the vertices.
        	for (var i =0; i < vertices.getLength(); i++) {
          		var xy = vertices.getAt(i);
          		contentString += '<option>' + 'Coordinate ' + i + ' :: ' + xy.lat() + ',' +
              	xy.lng() + '</option>';
        	}
        	contentString += '</select>';
        // Replace the info window's content and position.
        	infoWin.setContent(contentString);
        	infoWin.setPosition(event.latLng);

	        infoWin.open(map);
  		}
       

