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
            console.log('success')
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
                })
            })
        }
    })
})