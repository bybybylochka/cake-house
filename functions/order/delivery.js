let container=document.querySelector(".delivery__information");
let orderInfo=document.querySelector(".order__information");
let deliveryTypes=document.getElementsByName("delivery-type");
let selectedType='';
document.querySelector(".cart__price p").textContent=orderInfo.getAttribute("price");


deliveryTypes.forEach(type=>{
    type.addEventListener('change', (event)=>{
        if(type.checked) selectedType=type;
        console.log(selectedType);
        if(selectedType.value==="Самовывоз"){
            pickupTemplate();
            orderInfo.setAttribute("data-deliveryType", "Самовывоз");
            orderInfo.setAttribute("data-deliveryAddress", "");
        }
        else {
            deliveryTemplate();
            orderInfo.setAttribute("data-deliveryType", "Курьерская доставка");
        }
    })
})


function pickupTemplate(){
    let p=document.createElement("p");
    p.classList.add("pickup-information");
    p.textContent="Самовывоз осуществляется по адресу нашего заведения: ул. Кальварийская, д.14";
    container.innerHTML='';
    container.appendChild(p);
}

function deliveryTemplate(){
    let p=document.createElement("p");
    p.classList.add("delivery-information");
    p.textContent="Курьер доставит заказ прямо до двери вашего дома в любое удобное для вас время.";
    container.innerHTML='';
    container.appendChild(p);
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem("jwtToken")
        }),
        success: user => {
            $.ajax({
                url: "http://localhost:3000/addresses/find",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    userId:user.id
                }),
                success: (data) => {
                    let select=document.createElement("select");
                    data.forEach(elem=> {
                        let address='ул. '+elem.street+'д. '+elem.houseNumber+'кв. '+elem.apartmentNumber;
                        let option=document.createElement("option");
                        select.classList.add("select");
                        option.innerHTML=address;
                        select.appendChild(option);
                    })
                    select.addEventListener('change',  () => {
                        orderInfo.setAttribute("data-deliveryAddress", select.value);
                    })
                    container.appendChild(select);
                }
            })
        }
    })
}

$(document).ready(()=> {
    let $info =$('.order__information');
    $('#order-button').click(()=>{
        $info.innerHTML='';
        $info.load('../pages/order_templates/card_template.html');
    });
});

