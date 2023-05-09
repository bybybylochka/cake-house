$.ajax({
    url: "http://localhost:3000/user/verify",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        token: localStorage.getItem('jwtToken')
    }),
    success: user => {
        $.ajax({
            url: "http://localhost:3000/cards/find",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                userId: user.id
            }),
            success: data => {
                let ul = document.querySelector('.cards__list');
                data.forEach(item => {
                    let li = document.createElement("li");
                    li.classList.add("card");
                    li.textContent = "Номер карты: " + item.cardNumber + ", Имя владельца: " + item.cardOwner + ", срок действия: " + item.validityPeriod;
                    ul.appendChild(li);
                })
            }
        })
    }
})









let button=document.getElementById("add-card");

button.addEventListener('click', (event)=>{
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem('jwtToken')
        }),
        success: user => {
            $.ajax({
                url: "http://localhost:3000/cards/create",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    id: user.id,
                    card: {
                        cardNumber: document.getElementById('cardNumber').value,
                        cardOwner: document.getElementById('cardOwner').value,
                        validityPeriod: document.getElementById('validityPeriod').value
                    }
                }),
                success: ()=>{
                    document.querySelector('.card__new').reset();
                }
            })
        }
    })
})

let cardNumberInput=document.getElementById('cardNumber');
let cardOwnerInput=document.getElementById('cardOwner');
let validityInput=document.getElementById('validityPeriod');

cardNumberInput.addEventListener('change', (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector(".invalidCardNumber");
    invalidText.textContent='';
    let regex=/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/;
    if(regex.test(cardNumberInput.value)) {
        button.disabled=false;
    }
    else{
        invalidText.textContent='Номер карты введен в неверном формате : XXXX XXXX XXXX XXXX';
        button.disabled=true;
    }
})

cardOwnerInput.addEventListener('change', (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector(".invalidCardOwner");
    invalidText.textContent='';
    let regex=/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
    if(regex.test(cardOwnerInput.value)) {
        button.disabled=false;
    }
    else{
        invalidText.textContent='Имя владельца введен в неверном формате : IVANOV IVAN';
        button.disabled=true;
    }
})

validityInput.addEventListener('change', (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector(".invalidCardDate");
    invalidText.textContent='';
    let regex=/^(0[1-9]|1[0-2])\/([2-9][0-9])$/;
    if(regex.test(validityInput.value)) {
        button.disabled=false;
    }
    else{
        invalidText.textContent='Срок действия введен в неверном формате : XX/XX';
        button.disabled=true;
    }
})