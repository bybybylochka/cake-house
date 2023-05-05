let promocodesContainer=document.querySelector(".promocodes__content");
let addPromocodeButton=document.getElementById("add_promocode");
let delPromocodeButton=document.getElementById("del_promocode");


showPromocodes();
function showPromocodes(){
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem('jwtToken')
        }),
        success: user => {
            $.ajax({
                url: "http://localhost:3000/promocodes/",
                type: "GET",
                contentType: "application/json",
                success: data => {
                    let promocodesTable=createPromocodesTable(data);
                    promocodesContainer.appendChild(promocodesTable);
                }
            })
        }
    })
}

delPromocodeButton.addEventListener("click", (event)=>{
    event.preventDefault();
    let delCodeInput=document.getElementById("del-promocode");
    $.ajax({
        url: "http://localhost:3000/promocodes/delete",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            code: delCodeInput.value,
        }),
        success:()=> {
            promocodesContainer.innerHTML='';
            showPromocodes();
        }

    })
})
addPromocodeButton.addEventListener("click", (event)=>{
    event.preventDefault();
    let addCodeInput=document.getElementById("add-code");
    let addDiscountInput=document.getElementById("add-discount");
    $.ajax({
        url: "http://localhost:3000/promocodes/add",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            code: addCodeInput.value,
            discountPercent: addDiscountInput.value
        }),
        success: promocode => {
            promocodesContainer.innerHTML='';
            showPromocodes();
        }

    })
})

function createPromocodesTable(promocodes){
    let table=createTable(["Код","Скидка"]);
    promocodes.forEach(promocode=>{
        let tr=document.createElement("tr");
        let td_code=document.createElement("td");
        td_code.textContent=promocode.code;
        let td_discount=document.createElement("td");
        td_discount.textContent=promocode.discountPercent+'%';
        tr.appendChild(td_code);
        tr.appendChild(td_discount);
        table.appendChild(tr);
    })
    return table;
}