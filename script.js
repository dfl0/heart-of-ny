var map = L.map('map', {
    center: [42.1044, -75.9127],
    zoom: 8,
    minZoom: 8,
    maxBounds: L.latLngBounds([40.8821, -80.0110], [43.3267, -71.8335]),
    maxBoundsViscosity: 1
});


function main() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}


main();
