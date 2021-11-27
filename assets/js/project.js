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
    len = data['homeEntities'].length
    infos.innerHTML = "<strong>" + len + " résultat(s) trouvé(s)</strong>";
}

const filterSearch = (request) => {
    console.log(request)
    fetch(url + 'home/credit', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        data = json['homeEntities']
        console.log(data);
        fillInfos(json);
        //Paginatin Init
        
        page = 1;
        pageMax = Math.floor(data.length / 8) + 1;
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
                'typeResearch': "Projet",
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
    });
}

const search = () => { 
    //Query creation
    const zip = document.getElementById("zip").value;
    let type = document.getElementById("type").value;
    if (type === "Local industriel") { type = "Local industriel. commercial ou assimilé" }
    const surface = document.getElementById("surface").value;
    const rooms = document.getElementById("rooms").value;
    const input = document.getElementById("input").value;
    const salary = document.getElementById("salary").value;
    const request = {
        "filters": {
            "code_postal": zip ? parseInt(zip): undefined,
            "nombre_pieces_principales": rooms ? parseInt(rooms) : undefined,
            "surface_reelle_bati": surface ? parseInt(surface): undefined,
            "type_local": type === "Tous les types" ? undefined : type,
        },
        "creditInfos": {
            "apport": input ? +input : undefined,
            "salaire": salary ? +salary : undefined
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