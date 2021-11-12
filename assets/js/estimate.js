const url = 'http://localhost:3000/';
const columns = ["valeur_fonciere", "adresse_numero", "adresse_nom_voie", "nom_commune", "code_postal", "nombre_pieces_principales", "type_local", "date_mutation"];
const data = []
const resultContainer = document.getElementById("result-container");
const infos = resultContainer.querySelector("p");
const sliderContainer = resultContainer.querySelector('div');
const slider = sliderContainer.querySelector('input');

const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin"
}

const fillInfos = (data) => {
    infos.innerHTML = 
    `
    Nombre de résultat(s) similaire(s) : ${data['nbResult']}
    <br>
    Indice de confiance : ${data['trustIndex']}%
    <br>
    Prix moyen au m² : ${data['averagePrice']}€
    <br>
    Prix minimum au m² : ${data['deltaMinMax']['min']}€
    <br>
    Prix maximum au m² : ${data['deltaMinMax']['max']}€
    <br>`
    sliderContainer.style.display = "block";
    slider.max = data['deltaMinMax']['max'];
    slider.min = data['deltaMinMax']['min'];
    slider.value = data['averagePrice'];
    slider.oninput();
}

slider.oninput = () => {
    const surface = document.getElementById("surface").value;
    const estimation = document.getElementById("estimation");
    const squaremeter = document.getElementById("squaremeter");
    estimation.innerHTML = "Estimation du prix du bien : " + +surface * slider.value + '€';
    squaremeter.innerHTML = "Prix au mètre carré : " + slider.value + '€';
}

const filterEstimate = (request) => {
    console.log(request)
    fetch(url + 'home/averagePrice/apartment', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        fillInfos(json)
    });
}

const estimate = () => {
    const zip = document.getElementById("zip").value;
    let type = document.getElementById("type").value;
    if (type === "Local industriel") { type = "Local industriel. commercial ou assimilé" }
    const surface = document.getElementById("surface").value;
    const rooms = document.getElementById("rooms").value;
    const price = document.getElementById("price").value;
    const request = {
        "filters": {
            "code_postal": zip ? parseInt(zip): undefined,
            "nombre_pieces_principales": rooms ? parseInt(rooms) : undefined,
            "valeur_fonciere": price ? parseInt(price) : undefined,
            //"lot1_surface_carrez": surface ? parseInt(surface): undefined,
            "type_local": type === "Tous les types" ? undefined : type,
        }
    }
    filterEstimate(request)
}