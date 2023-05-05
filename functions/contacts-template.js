let info=document.querySelector(".order__information");
let telInput= document.getElementById("phone-number");
let price=document.querySelector(".cart__price p");
price.textContent=info.getAttribute("price");

telInput.addEventListener("input", (event)=>{
    info.setAttribute("data-phoneNumber", telInput.value);
})

$(document).ready(()=> {
    let $info =$('.order__information');
    $('#order-button').click(()=>{
        $info.innerHTML='';
        $info.load('../pages/order_templates/delivery_template.html');
    });
});
