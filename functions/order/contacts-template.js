let info=document.querySelector(".order__information");
let telInput= document.getElementById("phone-number");
let price=document.querySelector(".cart__price p");
price.textContent=info.getAttribute("price");

telInput.addEventListener("change", (event)=>{
    let invalidText=document.querySelector(".invalidPhone");
    invalidText.textContent='';
    info.setAttribute("data-phoneNumber", telInput.value);
    let regex=/^\+375\((44|29|25|33)\)\d{7}$/;
    if(regex.test(telInput.value)){
        $(document).ready(()=> {
            let $info =$('.order__information');
            $('#order-button').click(()=>{
                $info.innerHTML='';
                $info.load('../pages/order_templates/delivery_template.html');
            });
        });
    }
    else{
        invalidText.textContent='Номер телефона введен в неверном формате : +375(XX)XXXXXXX';
        document.querySelector('.placing-order__contacts').appendChild(invalidText);
    }
})


