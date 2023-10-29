function myFunc(counties) {
  var map = L.map('map').setView([42.10442, -75.91277], 8);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org  /copyright">OpenStreetMap</a>'
  }).addTo(map);

//set bnounds and zoom limit
  var southWest = L.latLng(42.113,-79.134 ),
  northEast = L.latLng(43.140,-73.353);
  var bounds = L.latLngBounds(southWest, northEast);
  
  map.setMaxBounds(bounds);
  map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: false });
  });

  map.setMinZoom( map.getBoundsZoom( map.options.maxBounds ) );

  //marker at Techworks
  var marker = L.marker([42.10442, -75.91277]).addTo(map);
  marker.bindPopup("<b>Techworks!</b><br>").openPopup();

  var geojson = L.geoJson(counties);

  //adds counties to map
  L.geoJson(counties, {
    onEachFeature: onEachFeature
    
  }).addTo(map);

  //mouseover actions
  function onMapMouseOver(e) {
    var layer = e.target;
    
    //hover highlight
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    layer.bringToFront();
  
    //update info box
    info.update(layer.feature.properties);

    //label counties
    layer.bindTooltip(layer.feature.properties.name, {permanent: true, direction: "center", className: "my-labels"}); 
  }

  //resets mouseover actions
  function onMapMouseOut(e) {
    var layer = e.target;

    //reset hover highlight
    geojson.resetStyle(layer);

    //reset infobox
    info.update();

    e.target.unbindTooltip();
  }

  //click actions
  function onMapClick(e) {
    var layer = e.target;
    
    layer.bindPopup('<h4>' + layer.feature.properties.name + '</h4>' + 'website name  ');
  }

  //adds event listeners
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: onMapMouseOver,
      mouseout: onMapMouseOut,
      click: onMapClick
    });
    
  }

  //info box
  var info = L.control();

  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  //method that we will use to update the control based on feature properties passed
  info.update = function(props) {
    this._div.innerHTML = '<h4>County</h4>' + (props ? '<b>' + props.name + '</b><br />' : 'Hover over a county');
  };

  info.addTo(map);
}



//get data from counties json file
fetch('counties.json')
  .then(data => data.json())
  .then(counties => myFunc(counties));