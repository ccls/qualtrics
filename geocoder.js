Qualtrics.SurveyEngine.addOnload(function()
{
/*Place Your Javascript Below This Line*/

  var google_maps_loaded = false; // no longer seems to be needed, nevertheless
  // no 'var' with functions
  loadedGoogleMapsAPI = function(){ google_maps_loaded = true; };
  // callback kinda required with google maps
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_OWN_KEY_HERE&v=3.exp&sensor=false&callback=loadedGoogleMapsAPI";
  document.body.appendChild(script);

  var canvas;
  var map;
  var marker;
  var question = this;
  var latitudeIndex  = question.getChoicesFromVariableName('Latitude').first() - 1;
  var longitudeIndex = question.getChoicesFromVariableName('Longitude').first() - 1;
  var lat = $(question.getChoiceContainer()).down('.InputText', latitudeIndex);
  var lng = $(question.getChoiceContainer()).down('.InputText', longitudeIndex);
  
  setMarkerLatLng = function(){
    if( lat.value && lng.value ){
      marker.setPosition( new google.maps.LatLng(lat.value, lng.value) );
    };
  };
  
  saveMarkerLatLng = function(){
    lat.value = marker.getPosition().lat();
    lng.value = marker.getPosition().lng();
  };
  
  showGoogleMap = function(){
    background = document.createElement("div");
    background.id = 'map_canvas_background';
    background.setAttribute('style', 'position: absolute; width: 100%; height: 100%; background-color: gray; opacity: 0.6;filter:alpha(opacity=60); top: 0px;');
    document.body.appendChild(background);

    wrapper = document.createElement("div");
    wrapper.id = 'map_canvas_wrapper';
    wrapper.setAttribute('style', 'position: absolute; width: 100%; height: 100%; margin: auto; text-align: center; top: 0px;');
    document.body.appendChild(wrapper);

    canvas = document.createElement("div");
    canvas.id = 'map_canvas';
    canvas.setAttribute('style', 'width: 400px; height: 400px; margin: 10px auto;');
    wrapper.appendChild(canvas);
    
    button = document.createElement("button");
    button.innerHTML = "This is the spot. Close GeoCoder.";
    button.onclick = function(){
      document.getElementById('map_canvas_background').remove();
      document.getElementById('map_canvas_wrapper').remove();
    };
    wrapper.appendChild(button);
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(14.613567,-90.53524),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(canvas, mapOptions);

    marker = new google.maps.Marker({
      map: map,
      draggable: true
    });
    setMarkerLatLng();
    google.maps.event.addListener(marker, "mouseup", function(){saveMarkerLatLng();});
    google.maps.event.addListener(map,'click',function(event){
      marker.setPosition( event.latLng );
      saveMarkerLatLng();
    });
    
    var address = $(question.getChoiceContainer()).down('.InputText',0).value + ', ' +
        $(question.getChoiceContainer()).down('.InputText',1).value + ', ' +
        $(question.getChoiceContainer()).down('.InputText',2).value + ', ' +
        $(question.getChoiceContainer()).down('.InputText',3).value + ', ' +
        $(question.getChoiceContainer()).down('.InputText',4).value;
    geoCodeString(address);

  };

  geoCodeString = function( string ) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': string }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        marker.setPosition( results[0].geometry.location );
        saveMarkerLatLng();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  
});
