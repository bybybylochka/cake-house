let butAddToCart=document.getElementById("add_modified_to_cart");

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
            console.log(user);
            let product=createModifiedProductForCart();
            console.log(product);
            let idCart="cart"+ user.id;
            let cart = JSON.parse(localStorage.getItem(idCart))||[];
            cart.push(product);
            localStorage.setItem(idCart, JSON.stringify(cart));
        }
    })
})



function createModifiedProductForCart(){
    let weight=document.getElementById("weight");
    let tiers=document.getElementById("tiers");
    let color=document.getElementById("color");
    let decoration=document.getElementById("decoration");
    let price=document.querySelector(".constructor__price");
    let wishes=document.getElementById("wishes");
    let constructor=document.querySelector(".constructor__content");
    let product={
        name: constructor.querySelector(".constructor__name").textContent,
        img: document.querySelector('.constructor__image img').src,
        weight: weight.value+' г.',
        price:price.textContent+' BYN',
        tiersCount: tiers.value,
        color: color.value,
        decor: decoration.value,
        wishes: wishes.value,
        count:1
    }
    console.log(product);
    return product;
}