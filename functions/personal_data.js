let nameInput=document.getElementById('name');
let surnameInput=document.getElementById('surname');
let phoneInput=document.getElementById('phone-number');
let mail=document.getElementById('email');
let birthdayInput=document.getElementById('birthday');
let cost=document.getElementById("cost-of-purchases");


document.addEventListener("DOMContentLoaded", ()=>{
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem("jwtToken")
        }),
        success: (user)=>{
            $.ajax({
                url: 'http://localhost:3000/user/findById',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    id: user.id
                }),
                success : (user) => {
                    if(user.name){
                       nameInput.value=user.name;
                    }
                    if(user.surname){
                        surnameInput.value=user.surname;
                    }
                    if(user.birthday){
                        birthdayInput.value=user.birthday;
                    }
                    phoneInput.value=user.phoneNumber;
                    mail.textContent=user.mail;
                    cost.textContent=user.costOfPurchases+" BYN";
                }
            })
        }

    })
})

let changeButton=document.getElementById('change-personal-data');
changeButton.addEventListener("click", (event)=> {
    event.preventDefault();
    console.log('click');
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem("jwtToken")
        }),
        success: (user) => {
            $.ajax({
                url: "http://localhost:3000/user/update",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    id: user.id,
                    name: nameInput.value,
                    surname: surnameInput.value,
                    birthday: birthdayInput.value,
                    phoneNumber: phoneInput.value
                }),
                success: (data) => {
                    console.log('success');
                    location.reload();
                }
            })
        }
    })
})
