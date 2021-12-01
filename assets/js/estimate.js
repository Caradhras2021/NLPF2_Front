const url = 'https://flexxnath.la.salo.pe/';
const columns = ["valeur_fonciere", "adresse_numero", "adresse_nom_voie", "nom_commune", "code_postal", "nombre_pieces_principales", "type_local", "date_mutation"];
const data = []
const resultContainer = document.getElementById("result-container");
const infos = resultContainer.querySelector("p");
const sliderContainer = resultContainer.querySelector('div');
const slider = sliderContainer.querySelector('input');
const estimation = document.getElementById("estimation");
const squaremeter = document.getElementById("squaremeter");
let inflation = 0;

const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin"
}

const fillInfos = (data) => {
    infos.innerHTML = 
    `
    Nombre de résultat(s) similaire(s) :<strong> ${data['nbResult']}</strong>
    <br>
    Indice de confiance : <strong>${data['trustIndex']}%</strong>
    <br>
    <br>
    Prix minimum au m² :<strong> ${data['deltaMinMax']['min']}€</strong>
    <br>
    Prix maximum au m² :<strong> ${data['deltaMinMax']['max']}€</strong>
    <br><br>`
    sliderContainer.style.display = "block";
    slider.max = data['deltaMinMax']['max'];
    slider.min = data['deltaMinMax']['min'];
    slider.value = data['averagePrice'];
    slider.oninput();
}

slider.oninput = () => {
    const surface = document.getElementById("surface").value;
    const price  = +surface * slider.value
    let futurePrice = 0;
    if (inflation <= 0) {
        inflation *= -1;
        inflation /= 100;
        futurePrice = (1 - (inflation / 5))
    }
    else {
        inflation /= 100;
        futurePrice = (1 + (inflation / 5));
    }
    estimation.innerHTML = "Estimation de la valeur foncière du bien : " +  price + '€';
    estimation.innerHTML += "<br>Estimation de la valeur foncière en 2025 : " + Math.round(futurePrice * price) + '€';
    squaremeter.innerHTML = "Prix au mètre carré : " + slider.value + '€';
}

const fillInflationRate = (data) => {
    infos.innerHTML += 'Prix moyen au m² en 2019 : <strong>' + data['averagePrice2019'] + '€</strong><br>';
    infos.innerHTML += 'Prix moyen au m² en 2020 : <strong>' + data['averagePrice2020'] + '€</strong><br><br>';
    infos.innerHTML += 'Pourcentage d\'inflation: <strong>' + data['inflationRate'] + '%</strong><br>';
    inflation = data['inflationRate'];
}

const filterEstimate = (request) => {
    console.log(request)
    fetch(url + `home/averagePrice/${request['type_local']}`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        fillInfos(json)

        const type = request['type_local'] == "apartment" ? "Appartement" : "Maison"
        const log = {
            logs: {
                'login':  "admin",
                'email_address':  "admin@epita.fr",
                'typeResearch': "Estimation",
                'type': type,
                'rooms': request.filters['nombre_pieces_principales'],
                'surface': request.filters['surface_reelle_bati'],
                'code_postal': request.filters['code_postal'],
                'resultat': json['nbResult'],
            }
        }
        fetch(url + 'logs', {
            method: 'POST',
            body: JSON.stringify(log),
            headers: headers
        })

        fetch(url + 'home/inflationRate', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: headers
        })
        .then(response => response.json())
        .then(inflation => {
            fillInflationRate(inflation)
            slider.oninput();
            console.log(inflation);
        })
    });
}

const estimate = () => {
    const zip = document.getElementById("zip").value;
    let  type = "apartment";
    if (document.getElementById("type").value == "Maison") {
        type = "house";
    }
    const surface = document.getElementById("surface").value;
    const rooms = document.getElementById("rooms").value;
    const request = {
        "filters": {
            "code_postal": zip ? parseInt(zip): undefined,
            "nombre_pieces_principales": rooms ? parseInt(rooms) : undefined,
            "surface_reelle_bati": surface ? parseInt(surface): undefined,
        },
        "type_local": type === "Tous les types" ? undefined : type,
    }
    filterEstimate(request)
}