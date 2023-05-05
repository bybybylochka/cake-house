let addButton=document.querySelector(".product__modified button");
console.log(document.querySelector('.product__popup .product__image'));
addButton.addEventListener("click", (event)=>{
    event.preventDefault();
    let productImage=document.querySelector('.product__popup .product__image').src;
    let productName = document.querySelector('.popup__content .product__title').textContent;
    let price = document.querySelector('.product__price').textContent.split(' ')[0];
    window.location.href = "http://localhost:63342/cake-house/pages/constructor.html?productName=" + productName + "&price=" + price+"&image="+productImage;
})


