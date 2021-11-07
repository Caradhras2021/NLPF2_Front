var bodyObj =
    {
        "filters" : 
          {
              "type_local": "Maison",
              "code_postal": 75016
          }
      }

fetch('http://localhost:3000/home/averagePrice/apartment', {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept-Language': 'en-us,en;q=0.5',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
            'Connection': 'keep-alive'
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });


// const table = document.getElementById("table-content");

// const columns = ["price", "address", "city", "zip"];

// //Begin API Call

// var xhr = new XMLHttpRequest();

// xhr.onload = function () {

// 	if (xhr.status >= 200 && xhr.status < 300) {

//       const res = JSON.parse(xhr.response);
//       console.log(res);
    
// 	} else {
//       console.log('The request failed!');
// 	}
// };

// xhr.open('POST', 'http://localhost:3000/home/averagePrice/apartment');
// xhr.setRequestHeader('Content-Type', 'application/json');
// var body =
//     {
//         "filters" : 
//           {
//               "type_local": "Maison",
//               "code_postal": 75016
//           }
//       }

// var bodyJson = JSON.stringify(body)
// console.log(bodyJson);
// xhr.send(bodyJson);
// //End API Call

// const data = [
//     {
//         price: "270 000€",
//         address: "17 rue du bourg",
//         city: "Juziers",
//         zip: "78820"
//     },
//     {
//         price: "500 000€",
//         address: "48 rue de l'église",
//         city: "Juziers",
//         zip: "78820"
//     }
// ]

// for (const i in data) {
//     const elt = data[i];
//     const tr = document.createElement('tr')
//     for (const c in columns) {
//         const column = columns[c]
//         const td = document.createElement('td');
//         td.innerHTML = elt[column];
//         tr.appendChild(td)
//     }
//     table.appendChild(tr);
// }

// const search = () => {
//     const zip = document.getElementById("zip").value;
//     const type = document.getElementById("type").value;
//     const surface = document.getElementById("surface").value;
//     const rooms = document.getElementById("rooms").value;
//     const price = document.getElementById("price").value;
//     //ToDo : API call with parameters
// }