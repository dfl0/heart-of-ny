var map = L.map('map', {
    center: [42.1044, -75.9127],
    zoom: 8,
    minZoom: 8,
    maxBounds: L.latLngBounds([40.8821, -80.0110], [43.3267, -71.8335]),
    maxBoundsViscosity: 1
});

var overlayStyle = {
    "color": "#dcae25",
    "weight": 2,
    "opacity": 0.5,
    "fillColor": "#ffffff",
    "fillOpacity": 0
};

var hoveredStyle = {
    "color": "#ff0000",
    "weight": 2,
    "opacity": 0,
    "fillColor": "#dcae25",
    "fillOpacity": 0.5
};


function onMouseOver(e) {
    e.target.setStyle(hoveredStyle);
    // e.target.openPopup();
}

function onMouseOut(e) {
    e.target.setStyle(overlayStyle);
    // e.target.closePopup();
}

function onEachFeature(feature, layer) {
    var name = L.tooltip({
        content: "<p>" + layer.feature.properties.name + "</p>",
        className: "label",
        direction: "center",
        opacity: 1
    });

    var label = name.getElement();
    var width = layer.offsetWidth;
    var height = layer.offsetHeight;

    layer.bindTooltip(name);

    layer.on({
        mouseover: onMouseOver,
        mouseout: onMouseOut
    });
}

function main() {
    // add tile layer to map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // add county overlay layer
    L.geoJSON(counties, {
        style: overlayStyle,
        onEachFeature: onEachFeature
    }).addTo(map);

    // add marker at TechWorks!
    L.marker([42.10442541105549, -75.91265528372267]).addTo(map).bindPopup('TechWorks!').openPopup();
}


main();
