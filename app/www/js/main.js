/****
Using the fucntions from service.js
****/

var Smap = (function() {
  // set amp object as global
  var _map;

  /***
  START: Debuging -- retun _map object for debuging 
  ***/  
  var getmap = function(){
    return _map;
  };
  /***
  STOP: Debuging 
  ***/


  /***
  START: Initilize -- _map object, set current location 
  ***/
  var init = function(mapid){
   

    // initilizing the map object --  need to fix the fit world function -- set to the boundries 
    _map = L.map(mapid).fitWorld();
    _map.setZoom(18);

    setCurentLocation();
    // $(mapid).css("height", "500px" );

    // Loading the "open streat map" 
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWlsYW5wYWxzaW5naCIsImEiOiJjaXFmb2VwbHIwM3FlZnJtMXR2NHJjcDBsIn0.vPN-24ZXoCTdATPYq3y_VA', {
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      id: 'mapbox.streets'
    }).addTo(_map);
  };
  /***
  STOP: Initilize 
  ***/

  /***
  START: setCurrentLocation - set the map tot he curent location
  ***/
  var setCurentLocation = function(){
    // if location -- set map location to the current location
      GetCurentLocation(function(position){
          // set the map to the curent location
          _map.setView([position.coords.latitude, position.coords.longitude], 16);
      });
  };
  /***
  STOP: setCurrentLocation 
  ***/

  /***
  START: addpin -- options:   
  ***/
  var addPin = function(options){
    addpin(_map,options);
  };
  /***
  STOP: addPin
  ***/

  var addCtrl = function(callback, options){
    return addControler(_map, callback, options)
  };

  var removeCtrl = function(ctrl){
    _map.removeControl(ctrl);
  };

  var offClick = function(){
    _map.removeEventListener("click");
  };

  var addMarker = function(location,popup){
    return addMark(_map,location,popup);
  };
  var removeMarker = function(marker){
    _map.removeLayer(marker);
  };

  var getTagColor = function(tag){
  var color= '#ED2324';
  switch(tag) {
    case 'help':
        color = '#ED2324'
        break;
    case 'hazard':
        color = '#F49B33'
        break;
    case 'found':
        color = '#62E16E'
        break;
    case 'supplies':
        color = '#5056D5'
        break;
    default:
        color = '#ED2324'
  }
  return color;
};

  return {
      // START: for debuging
      Smap: getmap,
      // END: debuging  
      init: init,
      addPin: addPin, 
      addCtrl: addCtrl,
      removeCtrl: removeCtrl,
      offClick: offClick,
      addMarker: addMarker, 
      setCurentLocation: setCurentLocation, 
      removeMarker: removeMarker,  
      getTagColor: getTagColor, 
  };
})();




















