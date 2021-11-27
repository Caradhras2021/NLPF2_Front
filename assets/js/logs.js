const url = 'https://flexxnath.la.salo.pe/';
const columns = ["logins", "email_address", "type_research", "surface", "pieces", "types", "dates", "code_postal", "resultat", "budget"];
const data = []
const resultContainer = document.getElementById("result-container");
const tableContent = document.getElementById("table-content");
const tableContainer = document.getElementById("table-container");
const table = tableContainer.querySelector("table");

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
        //Add row
        tableContent.appendChild(tr);
    }    
}

const searchLogs = (request) => {
    console.log(request)
    fetch(url + `logs/userLogs`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        fillTable(json)
    });
}

const fetchLogs = () => {
    const id = document.getElementById("id").value;
    const mail = document.getElementById("mail").value;
    const request = {
        "signIn": {
            "login": id,
            "email_address": mail,
        },
    }
    searchLogs(request)
}