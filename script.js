function myFunc(counties) {
  var map = L.map('map').setView([42.10442,-75.91277], 8);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org  /copyright">OpenStreetMap</a>'
  }).addTo(map);

  //marker at Techworks
  var marker = L.marker([42.10442,-75.91277]).addTo(map);
  marker.bindPopup("<b>Techworks!</b><br>").openPopup();
  
  var geojson = L.geoJson(counties);

  //adds counties to map
  L.geoJson(counties, {
    onEachFeature: onEachFeature
  }).addTo(map);


  //hover highlight
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    layer.bringToFront();

    info.update(layer.feature.properties);
  }

  //resets highlight
  function resetHighlight(e) {
    geojson.resetStyle(e.target);

    info.update();
  }

  //adds listeners
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
  }


  var info = L.control();
  
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  //method that we will use to update the control based on feature properties passed
  info.update = function (props) {
    this._div.innerHTML = '<h4>County</h4>' +  (props ? '<b>' + props.name + '</b><br />' : 'Hover over a county');
  };

  info.addTo(map);
}



//get data from counties json file
fetch('counties.json')
    .then(data => data.json())
    .then(counties => myFunc(counties));