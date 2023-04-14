//store the URL for the GeoJSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Add a tile layer.
let street_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street_map]
});

let baseMaps = {
    "street map": street_map
};

let earthquake_data = new L.LayerGroup();
let tectonics = new L.LayerGroup();

// drop down menu
let overlays = {
    "Earthquakes": earthquake_data,
    "Tectonic Plates": tectonics
};

L.control.layers(baseMaps, overlays).addTo(myMap);

function styleInfo(feature) {
    return {
        color: "orange",
        radius: 5, 
        fillColor: "red" 
    }
};

d3.json(url).then(function (data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlon) {
            return L.circleMarker(latlon);
        },
        style: styleInfo
    }).addTo(earthquake_data);
    earthquake_data.addTo(myMap);

    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (data) {
        L.geoJson(data, {
            color: "blue",
            weight: 2
        }).addTo(tectonics);
        tectonics.addTo(myMap);
    });


});

//collect data with d3
d3.json(url).then(function (data) {
    console.log(data);
    let features = data.features;
    console.log(features);
    let results = features.filter(id => id.id == "nc73872510");
    let first_result = results[0];
    console.log(first_result);
    let geometry = first_result.geometry;
    console.log(geometry);
    let coordinates = geometry.coordinates;
    console.log(coordinates);
    console.log(coordinates[0]);
    console.log(coordinates[1]);
    console.log(coordinates[2]);
    let magnitude = first_result.properties.mag;
    console.log(magnitude);
    let depth = geometry.coordinates[2];
    console.log(depth);
});