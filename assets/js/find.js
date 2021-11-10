const url = 'http://localhost:3000/';
const columns = ["valeur_fonciere", "adresse_numero", "adresse_nom_voie", "nom_commune", "code_postal", "nombre_pieces_principales", "type_local", "date_mutation"];
const data = []
const tableContent = document.getElementById("table-content");
const tableContainer = document.getElementById("table-container");
const table = tableContainer.querySelector("table");
const infos = tableContainer.querySelector("p")

const fillTable = (data) => {
    tableContent.innerHTML = "";
    table.style.display = "block";
    if (data.length == 0) { table.style.display = "none" }

    console.log(data);
    for (const i in data) {
        const elt = data[i];
        const tr = document.createElement('tr')
        for (const c in columns) {
            const column = columns[c]
            const td = document.createElement('td');
            td.innerHTML = elt[column];
            tr.appendChild(td)
        }
        tableContent.appendChild(tr);
    }    
}

const fillInfos = (data) => {
    infos.innerHTML = data.length + " résultat(s) trouvé(s)";
}

const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin"
}

const example = {
"filters" : 
    {
        "type_local": "Appartement",
        "code_postal": 44800,
        "nombre_pieces_principales": 3
    }
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
        fillInfos(json);
        fillTable(json);
    });
}


const bodyObj =
    {
        "filters" : 
          {
              "type_local": "Maison",
              "code_postal": 75016
          }
      }

fetch(url + 'home/averagePrice/apartment', {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: headers
})
.then(response => response.json())
.then(json => {
    console.log(json);
});

//Begin API Call

var xhr = new XMLHttpRequest();

xhr.onload = function () {

	if (xhr.status >= 200 && xhr.status < 300) {

      const res = JSON.parse(xhr.response);
      console.log(res);
    
	} else {
      console.log('The request failed!');
	}
};

xhr.open('POST', 'http://localhost:3000/home/averagePrice/apartment');
xhr.setRequestHeader('Content-Type', 'application/json');
var body =
    {
        "filters" : 
          {
              "type_local": "Maison",
              "code_postal": 75016
          }
      }

var bodyJson = JSON.stringify(body)
xhr.send(bodyJson);
//End API Call

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