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
    let counts = [0, 0, 0, 0, 0, 0, 0];
    const day1 = new Date();
    const day2 = new Date();
    const day3 = new Date();
    const day4 = new Date();
    const day5 = new Date();
    const day6 = new Date();
    const day7 = new Date();
    day2.setDate(day1.getDate() - 1)
    day3.setDate(day1.getDate() - 2)
    day4.setDate(day1.getDate() - 3)
    day5.setDate(day1.getDate() - 4)
    day6.setDate(day1.getDate() - 5)
    day7.setDate(day1.getDate() - 6)
    const d1 = day1.getUTCDate();
    const d2 = day2.getUTCDate();
    const d3 = day3.getUTCDate();
    const d4 = day4.getUTCDate();
    const d5 = day5.getUTCDate();
    const d6 = day6.getUTCDate();
    const d7 = day7.getUTCDate();

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const date = new Date(element["dates"].split(',')[0]).getUTCDate();
        switch (date) {
            case d1:
                counts[0]++;
                break;
            case d2:
                counts[1]++;
                break;
            case d3:
                counts[2]++;
                break;
            case d4:
                counts[3]++;
                break;
            case d5:
                counts[4]++;
                break;
            case d6:
                counts[5]++;
                break;
            case d7:
                counts[6]++;
                break;

        }
    }
    const max = Math.max(...counts);    
    for (let i = 0; i < 6; i++) {
        const date = new Date()
        date.setDate(day1.getUTCDate() - i)
        document.getElementById("d" + (i + 1).toString()).innerHTML =  `<th scope="row"> ${date.toDateString()} </th>`
        document.getElementById("d" + (i + 1).toString()).innerHTML += `<td  style="--start: ${counts[i + 1] / max}; --size: ${counts[i] / max}"> <span class="data"></span>${counts[i]}</td>`
        
    }
    document.getElementById("d" + (7).toString()).innerHTML += `<td  style="--start: ${0}; --size: ${counts[6]}"> <span class="data"></span>${counts[6]}</td>`

}