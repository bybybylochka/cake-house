let containerForPay=document.querySelector(".payment__information");
let paymentTypes=document.getElementsByName("payment-type");
let orderInformation=document.querySelector(".order__information");
let selectType='';
document.querySelector(".cart__price p").textContent=orderInformation.getAttribute("price");

paymentTypes.forEach(type=>{
    type.addEventListener('change', (event)=>{
        if(type.checked) selectType=type;
        console.log(selectType);
        if(selectType.value==="Наличные"){
            cashTemplate();
            orderInformation.setAttribute("data-paymentType", "Наличные");
            orderInformation.setAttribute("data-cardNUmber", "");
        }
        else{
            cardTemplate();
            orderInformation.setAttribute("data-paymentType", "Карта");
        }
    })
})


function cashTemplate(){
    let p=document.createElement("p");
    p.classList.add("cash-information");
    p.textContent="Самовывоз осуществляется по адресу нашего заведения: ул. Притыцкого 82";
    containerForPay.innerHTML='';
    containerForPay.appendChild(p);
}

function cardTemplate(){
    let p=document.createElement("p");
    p.classList.add("card-information");
    p.textContent="Курьер достави ваш заказ в любое удобное для вас время.";
    containerForPay.innerHTML='';
    containerForPay.appendChild(p);
    let select=document.createElement("select");
    select.classList.add("select");
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem("jwtToken")
        }),
        success: user => {
            $.ajax({
                url: "http://localhost:3000/cards/find",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    userId:user.id
                }),
                success: (data) => {
                    console.log(data);
                    data.forEach(item=> {
                        let card= "Номер карты: " + item.cardNumber + ", Имя владельца: " + item.cardOwner + ", срок действия: " + item.validityPeriod;

                        let option=document.createElement("option");
                        option.innerHTML=card;
                        select.appendChild(option);
                    })
                    orderInfo.setAttribute("data-cardNumber", select.value);
                    select.addEventListener('change',  () => {
                        orderInfo.setAttribute("data-cardNumber", select.value);
                    })
                    containerForPay.appendChild(select);
                }
            })
        }
    })
}