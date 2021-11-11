const url = 'http://localhost:3000/';
const columns = ["valeur_fonciere", "adresse_numero", "adresse_nom_voie", "nom_commune", "code_postal", "nombre_pieces_principales", "type_local", "date_mutation"];
const data = []
const tableContent = document.getElementById("table-content");
const tableContainer = document.getElementById("table-container");
const table = tableContainer.querySelector("table");
const infos = tableContainer.querySelector("p");

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
    infos.innerHTML = data.length + " résultat(s) trouvé(s)";
}

const filterSearch = (request) => {
    console.log(request)
    fetch(url + 'home/testFilters', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        formatData(json);
        fillInfos(json);
        fillTable(json);
    });
}

const search = () => {
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
            "lot1_surface_carrez": surface ? parseInt(surface): undefined,
            "type_local": type === "Tous les types" ? undefined : type,
        }
    }
    filterSearch(request)
}