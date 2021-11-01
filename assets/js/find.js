const table = document.getElementById("table-content");

const columns = ["price", "address", "city", "zip"];

const data = [
    {
        price: "270 000€",
        address: "17 rue du bourg",
        city: "Juziers",
        zip: "78820"
    },
    {
        price: "500 000€",
        address: "48 rue de l'église",
        city: "Juziers",
        zip: "78820"
    }
]

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

const search = () => {
    const zip = document.getElementById("zip").value;
    const type = document.getElementById("type").value;
    const surface = document.getElementById("surface").value;
    const rooms = document.getElementById("rooms").value;
    const price = document.getElementById("price").value;
    //ToDo : API call with parameters
}