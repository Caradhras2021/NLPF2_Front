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
    let counts = [0, 0, 0];

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let type = element["types"];
        if (!type) { type = "Tous" }
        switch (type) {
            case "Tous":
                counts[0]++;
                counts[1]++;
                break;
            case "Maison":
                counts[0]++;
                break;
            case "Appartement":
                counts[1]++;
                break;
            default:
                counts[2]++;
                break;

        }
    }
    const max = Math.max(...counts);   
    document.getElementById("house").innerHTML =  `<th scope="row">Maison</th>`
    document.getElementById("house").innerHTML += `<td  style="--start: 0; --size: ${counts[0] / max}; --color: rgb(130, 190, 255);"> <span class="data"></span>${counts[0]}</td>`
    document.getElementById("apart").innerHTML =  `<th scope="row">Appart'</th>`
    document.getElementById("apart").innerHTML += `<td  style="--start: 0; --size: ${counts[1] / max}; --color: rgb(190, 130, 255);"> <span class="data"></span>${counts[1]}</td>`
    document.getElementById("other").innerHTML =  `<th scope="row">Autre</th>`
    document.getElementById("other").innerHTML += `<td  style="--start: 0; --size: ${counts[2] / max}; --color: rgb(130, 190, 255);"> <span class="data"></span>${counts[2]}</td>`
    
}