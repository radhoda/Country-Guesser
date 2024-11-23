const map = L.map('map').setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors',
}).addTo(map)

let geojson;

const defaultStyle = {
    color: "#3388ff",
    weight: 1,
    fillOpacity: 0.5,
};

const highlightStyle = {
    color: "#ff0000",
    weight: 1,
    fillOpacity: 0.5,
};

function onEachCountry(feature, layer) {
    layer.on({
        mouseover: () => layer.setStyle({ weight: 2, color: "#666"}),
        mouseout: () => layer.setStyle(defaultStyle), 
    });
}

if ('/static/data/countries.json') {
    fetch('/static/data/countries.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            geojson = L.geoJSON(data, {
                style: defaultStyle,

                onEachFeature: onEachCountry,
            }).addTo(map);
        });
    }
else {
    console.log("Did not find json file.")
}

function submitGuess(event) {
    event.preventDefault();

    const guessedCountry = document.getElementById('country').value;

    console.log(guessedCountry)

    geojson.eachLayer(layer => {
        const countryName = layer.feature.properties.NAME.toLowerCase();

        if (countryName == guessedCountry) {
            layer.setStyle(highlightStyle);
            document.getElementById('result').innerText = 'Correct! you  guessed ${countryName}';
            console.log(document.getElementById('result').innerText);        }
        else {
            layer.setStyle(defaultStyle);
        }
    });
}

console.log("End of CountryGuessScript.js")
