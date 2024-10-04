let map = L.map('map', {
  center: [42.1044, -75.9127],
  zoom: 8,
  minZoom: 8,
  maxBounds: L.latLngBounds([40.8821, -80.0110], [43.3267, -71.8335]),
  maxBoundsViscosity: 1
});

let overlayStyle = {
  "color": "#dcae25",
  "weight": 2,
  "opacity": 0.5,
  "fillColor": "#ffffff",
  "fillOpacity": 0
};

let hoveredStyle = {
  "color": "#ff0000",
  "weight": 2,
  "opacity": 0,
  "fillColor": "#dcae25",
  "fillOpacity": 1
};


function onEachFeature(feature, layer) {
  let name = L.tooltip({
    content: "<p>" + feature.properties.name + "</p>",
    className: "label",
    direction: "center",
    opacity: 1
  });

  layer.bindTooltip(name);

  function showInfo() {
    const container = document.getElementById("info-container");
    container.setAttribute("show", "true");

    const close = document.getElementById("info-close");
    close.onclick = () => hideInfo();

    // console.log(feature.properties.name)
    const name = document.getElementById("info-name");
    name.innerHTML = "<p>" + feature.properties.name + "</p>"
  }

  function hideInfo() {
    const container = document.getElementById("info-container");
    container.setAttribute("show", "false");
  }

  function onMouseOver(e) {
    e.target.setStyle(hoveredStyle);
  }

  function onMouseOut(e) {
    e.target.setStyle(overlayStyle);
  }

  function onMouseClick(layer) {
    showInfo(layer);
  }

  layer.on({
    mouseover: onMouseOver,
    mouseout: onMouseOut,
    click: onMouseClick
  });
}

async function main() {
  // fetch the counties stored in Heart of NY database
  const DB_COUNTIES = await fetch("http://localhost:3000/api/counties")
    .then((res) => res.json())
    .then((data) => data)
    .catch(error => console.error('Error fetching data:', error));

  // filter GeoJSON data to only include counties that are in the database
  const FILTERED_COUNTIES_GEOJSON = COUNTIES_GEOJSON.features.filter((feature) => DB_COUNTIES.map((county) => county.county_name) .includes(feature.properties.name));

  // add tile layer to map
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // add county overlay layer
  L.geoJSON(FILTERED_COUNTIES_GEOJSON, {
    style: overlayStyle,
    onEachFeature: onEachFeature
  }).addTo(map);

  // add marker at TechWorks!
  // L.marker([42.10442541105549, -75.91265528372267]).addTo(map).bindPopup('TechWorks!').openPopup();
}


main();
