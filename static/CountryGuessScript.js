let defaultLayer, highlightLayer;

const defaultStyle = {
    color: "#3388ff",
    weight: 1,
    fillOpacity: 0.5,
};

const highlightStyle = {
    color: "#FF0000",
    weight: 1,
    fillOpacity: 0.5,
};

const map = L.map('map').setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors',
}).addTo(map)

function onEachCountry(feature, layer) {
    layer.on({
        mouseover: () => layer.setStyle({ weight: 2, color: "#666"}),
        mouseout: () => layer.setStyle(defaultStyle), 
    });
}

fetch('/static/data/countries.json')
    .then(response => response.json())
    .then(data => {
        defaultLayer = L.geoJSON(data, {
            style: defaultStyle,
            onEachFeature: onEachCountry,
        }).addTo(map);

        highlightLayer = L.geoJSON(null, {
            style: highlightLayer,
        }).addTo(map);
    })

function submitGuess(event) {
    event.preventDefault();

    const guessedCountry = document.getElementById('country').value.toLowerCase();

    console.log(guessedCountry)

    defaultLayer.eachLayer(layer => {
        const countryName = layer.feature.properties.NAME;

        if (countryName.toLowerCase() == guessedCountry) {
            
            highlightLayer.addData(layer.feature);

            defaultLayer.removeLayer(layer);

            document.getElementById('result').innerText = `Correct! you  guessed ${countryName}`;
            console.log(document.getElementById('result').innerText);        
        }
    });
}

console.log("End of CountryGuessScript.js")
