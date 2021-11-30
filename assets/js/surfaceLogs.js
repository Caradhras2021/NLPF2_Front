const url = 'https://flexxnath.la.salo.pe/';
const columns = ["logins", "email_address", "type_research", "surface", "pieces", "types", "dates", "code_postal", "resultat", "budget"];

const headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin"
}

const getLogs = () => {
    fetch(url + `logs/allLogs`, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(json => {
        countLogs(json);
    });
}

getLogs();

const countLogs = (data) => {
    let counts = [0, 0, 0, 0, 0];

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const surface = +element["surface"];
        if (!surface || isNaN(surface)) { continue }
        if (surface <= 25) {
            counts[0]++;
        }
        else if (surface <= 50) {
            counts[1]++;
        }
        else if (surface <= 75) {
            counts[2]++;
        }
        else if (surface <= 100) {
            counts[3]++;
        }
        else {
            counts[4]++;
        }
    }
    const max = Math.max(...counts);   
    document.getElementById("25").innerHTML =  `<th scope="row">0-25</th>`
    document.getElementById("25").innerHTML += `<td  style="--start: 0; --size: ${counts[0] / max}; --color: rgb(130, 190, 255);"> <span class="data"></span>${counts[0]}</td>`
    document.getElementById("50").innerHTML =  `<th scope="row">25-50</th>`
    document.getElementById("50").innerHTML += `<td  style="--start: 0; --size: ${counts[1] / max}; --color: rgb(190, 130, 255);"> <span class="data"></span>${counts[1]}</td>`
    document.getElementById("75").innerHTML =  `<th scope="row">50-75</th>`
    document.getElementById("75").innerHTML += `<td  style="--start: 0; --size: ${counts[2] / max}; --color: rgb(130, 190, 255);"> <span class="data"></span>${counts[2]}</td>`
    document.getElementById("100").innerHTML =  `<th scope="row">75-100'</th>`
    document.getElementById("100").innerHTML += `<td  style="--start: 0; --size: ${counts[3] / max}; --color: rgb(190, 130, 255);"> <span class="data"></span>${counts[3]}</td>`
    document.getElementById("125").innerHTML =  `<th scope="row">100+</th>`
    document.getElementById("125").innerHTML += `<td  style="--start: 0; --size: ${counts[4] / max}; --color: rgb(130, 190, 255);"> <span class="data"></span>${counts[4]}</td>`

}