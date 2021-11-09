const url = 'http://localhost:3000/';
const columns = ["valeur_fonciere", "adresse_nom_voie", "nom_commune", "code_postal"];
const data = []

const fillTable = (data) => {
    for (const i in data) {
        const elt = data[i];
        const tr = document.createElement('tr')
        for (const c in columns) {
            const column = columns[c]
            const td = document.createElement('td');
            td.innerHTML = elt[column];
            tr.appendChild(td)
        }
        table.appendChild(tr);
    }    
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
    fetch(url + 'home/testFilters', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
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

const table = document.getElementById("table-content");

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
    const type = document.getElementById("type").value;
    const surface = document.getElementById("surface").value;
    const rooms = document.getElementById("rooms").value;
    const price = document.getElementById("price").value;
    const request = {
        "filters": {
            "code_postal": parseInt(zip),
            "nombre_pieces_principales": parseInt(rooms),
            "valeur_fonciere": parseInt(price),
            "lot1_surface_carrez": parseInt(surface),
        }
    }
    filterSearch(request)
}