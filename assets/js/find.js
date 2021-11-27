const url = 'https://flexxnath.la.salo.pe/';
const columns = ["valeur_fonciere", "adresse_numero", "adresse_nom_voie", "nom_commune", "code_postal", "nombre_pieces_principales", "surface_reelle_bati", "type_local", "date_mutation"];
let data = []
let page = 1;
let pageMax = 1;
const tableContent = document.getElementById("table-content");
const tableContainer = document.getElementById("table-container");
const table = tableContainer.querySelector("table");
const infos = tableContainer.querySelector("p");
const pagination = document.getElementById("pagination");
const pageItem = document.getElementById("page");

const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin"
}

const formatData = (data) => {
    console.log(data);
    for (const elt in data) {
        //Date formatting
        data[elt]['date_mutation'] = data[elt]['date_mutation'].split('T')[0]
        //Price formatting
        let price = Math.round(parseInt(data[elt]['valeur_fonciere'])).toString() + '€';
        let i = price.length - 1;
        while (i >= 0) {
            price = price.slice(0, i) + ' ' + price.slice(i);
            i -= 3;
        }
        data[elt]['valeur_fonciere'] = price;
        //Surface formatting
        if (data[elt]['surface_reelle_bati'] == null) {
            data[elt]['surface_reelle_bati'] = "N/A"
        } else {
            data[elt]['surface_reelle_bati'] += " m²";
        }
    }
}

const fillTable = (data) => {
    tableContent.innerHTML = "";
    table.style.display = "block";
    if (data.length == 0) { table.style.display = "none" }

    for (const i in data) {
        const elt = data[i];
        const tr = document.createElement('tr')
        for (const c in columns) {
            const column = columns[c]
            const td = document.createElement('td');
            td.innerHTML = elt[column];
            tr.appendChild(td)
        }
        //Add link to map
        const td = document.createElement('td');
        td.innerHTML = `<a href="https://maps.google.fr/maps?q=${elt['latitude']},${elt['longitude']}">Voir sur la carte</a>`
        tr.appendChild(td);
        //Add row
        tableContent.appendChild(tr);
    }    
}

const fillInfos = (data) => {
    infos.innerHTML = "<strong>" + data.length + " résultat(s) trouvé(s)</strong>";
}

const fillInflationRate = (data) => {
    infos.innerHTML += '<br>';
    infos.innerHTML += 'Prix moyen au m² en 2019 : <strong>' + data['averagePrice2019'] + '€</strong><br>';
    infos.innerHTML += 'Prix moyen au m² en 2020 : <strong>' + data['averagePrice2020'] + '€</strong><br>';
    infos.innerHTML += 'Pourcentage d\'inflation: <strong>' + data['inflationRate'] + '%</strong><br>';
}

const filterSearch = (request) => {
    console.log(request)
    fetch(url + 'home/filters', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        formatData(json);
        data = json;
        fillInfos(json);
        //Paginatin Init
        
        page = 1;
        pageMax = Math.floor(json.length / 8) + 1;
        pageItem.innerHTML = `${page}/${pageMax}`; 
        pagination.style.display = "block";
        //Table Init
        nbElt = page == pageMax ? data.length % 8 : 8;
        copy = [... data].splice((page - 1) * 8, nbElt);
        fillTable(copy);
        pagination.scrollIntoView({ behavior: "smooth", block: "nearest"})

        const log = {
            logs: {
                'login':  "admin",
                'email_address':  "admin@epita.fr",
                'typeResearch': "Recherche",
                'type': request.filters['type_local'],
                'rooms': request.filters['nombre_pieces_principales'],
                'surface': request.filters['surface_reelle_bati'],
                'code_postal': request.filters['code_postal'],
                'budget': request.filters['valeur_fonciere'],
                'resultat': data.length.toString(),
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
            console.log(inflation);
        })
    });
}

const search = () => { 
    //Query creation
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
            "surface_reelle_bati": surface ? parseInt(surface): undefined,
            "type_local": type === "Tous les types" ? undefined : type,
        }
    }
    //API Call
    filterSearch(request)
}

const changePage = (value) => {
    page += value;
    pageItem.innerHTML = `${page}/${pageMax}`;
    nbElt = page == pageMax ? data.length % 8 : 8;
    copy = [... data].splice((page - 1) * 8, nbElt);
    fillTable(copy);
    if (page == 1) {
        document.getElementById("left-page").classList.add("disabled");
    } 
    else {
        document.getElementById("left-page").classList.remove("disabled");
    }
    if (page == pageMax) {
        document.getElementById("right-page").classList.add("disabled");
    } 
    else {
        document.getElementById("right-page").classList.remove("disabled");
    }
}