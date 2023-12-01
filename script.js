var map = L.map('map', {
    center: [42.10442541105549, -75.91265528372267],
    zoom: 8,
});


function main() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}


main();
