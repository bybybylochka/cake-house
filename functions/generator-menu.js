function productTemplate(){
    let menu_block=document.createElement("div");
    menu_block.classList.add("menu__product");
    let product_img=document.createElement("img");
    product_img.classList.add("product__image");
    let title=document.createElement("h4");
    title.classList.add("product__title");
    let description=document.createElement("p");
    description.classList.add("product__description");
    let weight=document.createElement("p");
    weight.classList.add("product__weight");
    menu_block.appendChild(product_img);
    menu_block.appendChild(title);
    menu_block.appendChild(description);
    menu_block.appendChild(weight);
    return menu_block;
}


function addProduct(elem){
    let menu=document.querySelector(".menu__products");
    let product=productTemplate();
    product.children[0].src=elem.img;
    product.children[1].textContent=elem.title;
    product.children[2].textContent=elem.description;
    product.children[3].textContent=elem.weight+ ' г';
    product.setAttribute("data-id", elem.id);
    product.addEventListener('click', (event) => {
        event.preventDefault();
        let obj={
            id: product.getAttribute("data-id")
        }
        console.log(obj);
        $.ajax({
            url: 'http://localhost:3000/products/findOne',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(obj),
            success : (data) => {
                console.log(data);
                openPopup(data)
            }
        })
    })
    menu.appendChild(product);
}
document.addEventListener("DOMContentLoaded", ()=>{
    let objType={
        productType: "Торты"
    }
    $.ajax({
        url: 'http://localhost:3000/products/findType',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(objType),
        success : (data) => {
            data.forEach(elem=>{
                addProduct(elem);
            })
        }
    })
})

let navBlocks=document.querySelectorAll(".menu__nav-block");
navBlocks.forEach((block) =>{
    block.addEventListener("click", ()=>{
        let menu=document.querySelector(".menu__products");
        menu.innerHTML='';
        let objType={
            productType: block.children[1].textContent
        }
        console.log(objType);
        $.ajax({
            url: 'http://localhost:3000/products/findType',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(objType),
            success : (data) => {
                data.forEach(elem => {
                    addProduct(elem);
                })
            }
        })
    })
})
