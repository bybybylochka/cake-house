function createTable(headers){
    let table=document.createElement("table");
    let thead=document.createElement("thead");
    let tbody=document.createElement("tbody");
    headers.forEach(header=>{
        let th=document.createElement("th");
        th.textContent=header;
        thead.appendChild(th);
    })
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}