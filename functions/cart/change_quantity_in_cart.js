window.onload = function () {
    let productQuantities = document.querySelectorAll('.product__quantity');
    console.log(productQuantities);
    productQuantities.forEach(productQuantity => {
        let quantity=productQuantity.querySelector(".quantity");
        let increase=productQuantity.querySelector(".quantity__increase");
        let decrease=productQuantity.querySelector(".quantity__decrease");
        decrease.addEventListener("click", (event)=> {
            let count = productQuantity.querySelector(".quantity").textContent;
            event.preventDefault();
            if(count<=9 && count>=2) {
                quantity.textContent = --count;
            }
        })
        increase.addEventListener("click", (event)=>{
            let count = productQuantity.querySelector(".quantity").textContent;
            event.preventDefault();
            if(count<=8 && count>=1) {
                quantity.textContent = ++count;
            }
        })
    })
}