export function productTemplate(){
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
