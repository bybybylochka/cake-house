let butAddToCart=document.getElementById("add-to-cart");

butAddToCart.addEventListener("click", (event)=>{
    event.preventDefault();
    console.log(localStorage.getItem("jwtToken"))
    $.ajax({
        url: 'http://localhost:3000/user/verify',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem("jwtToken")
        }),
        success : (user) => {
            let product=createProductForCart();
            let idCart="cart"+ user.id;
            let cart = JSON.parse(localStorage.getItem(idCart))||[];
            cart.push(product);
            localStorage.setItem(idCart, JSON.stringify(cart));
            closePopup();
        },
        error: (err)=>{
            alert("Необходимо авторизоваться!");
        }
    })
})



function createProductForCart(){
    let popup=document.querySelector(".product__popup");
    let product= {
        img: popup.querySelector(".product__image").src,
        name: popup.querySelector(".product__title").textContent,
        weight: popup.querySelector(".product__weight").textContent,
        price:popup.querySelector(".product__price").textContent,
        count:popup.querySelector(".quantity").innerText
    }
    return product;
}

let quantity=popup.querySelector(".quantity");
let increase=popup.querySelector(".quantity__increase");
let decrease=popup.querySelector(".quantity__decrease");
decrease.addEventListener("click", (event)=>{
    let count=popup.querySelector(".quantity").textContent;
    event.preventDefault();
    if(count<=9 && count>=2) {
        quantity.textContent = --count;
    }
})

increase.addEventListener("click", (event)=>{
    event.preventDefault();
    let count=popup.querySelector(".quantity").textContent;
    if(count<=8 && count>=1) {
        quantity.textContent = ++count;
    }
})