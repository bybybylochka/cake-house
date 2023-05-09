let productsContainer=document.querySelector(".products__content");
let idInput=document.getElementById("product-id");
let idInputDel=document.getElementById('product-id-del');
let selectField=document.getElementById("product-field-update");
let updateInput=document.getElementById("product-update");
let updateButton=document.getElementById('update');
let delButton=document.getElementById('delete');

idInput.addEventListener('change', (event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/products/findOne",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id: idInput.value
        }),
        success: product => {
            let products=[];
            products.push(product)
            let productInfo=createProductsTable(products);
            document.querySelector('.product_updated').appendChild(productInfo)
        }
    })
})

idInputDel.addEventListener('change', (event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/products/findOne",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id: idInputDel.value
        }),
        success: product => {
            let products=[];
            products.push(product)
            let productInfo=createProductsTable(products);
            document.querySelector('.product_deleted').appendChild(productInfo);
        }
    })
})
let field='';
selectField.addEventListener('change', (event)=>{
    event.preventDefault();
    console.log(idInput.value);
    $.ajax({
        url: "http://localhost:3000/products/findOne",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id: idInput.value
        }),
        success: product => {
            field=selectField.value;
            updateInput.value=product[field];
        }
    })
})

updateButton.addEventListener('click', (event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/products/update",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id: idInput.value,
            [field]: updateInput.value
        }),
        success: (data) => {
            document.getElementById("update_product_form").reset();
            document.querySelector('.product_updated').innerHTML="Информация успешно обновлена!";
        }
    })
})

delButton.addEventListener('click', (event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/products/delete",
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({
            id: idInputDel.value,
        }),
        success: (data) => {
            document.getElementById("delete_product_form").reset();
            document.querySelector('.product_deleted').innerHTML="Информация успешно удалена!";
        }
    })
})


showProducts();


function showProducts(){
    $.ajax({
        url: "http://localhost:3000/products/",
        type: "GET",
        contentType: "application/json",
        success: data => {
            let productTable=createProductsTable(data);
            productsContainer.appendChild(productTable);
        }
    })
}

function createProductsTable(products){
    let table=createTable(["ID изделия","Тип","Название изделия","Вес изделия","Стоимость"]);
    products.forEach(product=>{
        let tr=document.createElement("tr");
        let td_id=document.createElement("td");
        td_id.textContent=product.id;
        let td_type=document.createElement("td");
        td_type.textContent=product.type;
        let td_title=document.createElement("td");
        td_title.textContent=product.title;
        let td_weight=document.createElement("td");
        td_weight.textContent=product.weight+' г';
        let td_price=document.createElement("td");
        td_price.textContent=product.price+' BYN';
        tr.appendChild(td_id);
        tr.appendChild(td_type);
        tr.appendChild(td_title);
        tr.appendChild(td_weight);
        tr.appendChild(td_price);
        table.appendChild(tr);
    })
    return table;
}

function showProduct(product){

}