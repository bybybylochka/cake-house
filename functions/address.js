$.ajax({
    url: "http://localhost:3000/user/verify",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        token: localStorage.getItem('jwtToken')
    }),
    success: user => {
        $.ajax({
            url: "http://localhost:3000/addresses/find",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                userId: user.id
            }),
            success: data => {
                let ul = document.querySelector('.addresses__list');
                data.forEach(item => {
                    let li = document.createElement("li");
                    li.classList.add("address");
                    li.textContent = "ул. " + item.street + ", д. " + item.houseNumber + ", кв. " + item.apartmentNumber;
                    ul.appendChild(li);
                })
            }
        })
    }
})









let button=document.getElementById("add-address");
console.log(button);
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
                url: "http://localhost:3000/addresses/create",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    id: user.id,
                    address: {
                        street: document.getElementById('street').value,
                        houseNumber: document.getElementById('house').value,
                        apartmentNumber: document.getElementById('apartment').value
                    }
                })
            })
        }
    })
})