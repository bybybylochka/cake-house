let nameInput=document.getElementById('name');
let surnameInput=document.getElementById('surname');
let phoneInput=document.getElementById('phone-number');
let mail=document.getElementById('email');
let birthdayInput=document.getElementById('birthday');
let cost=document.getElementById("cost-of-purchases");
let changeButton=document.getElementById('change-personal-data');

changeButton.addEventListener("click", event=>{
    event.preventDefault();
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
});

phoneInput.addEventListener('change', (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector(".invalidPhone");
    invalidText.textContent='';
    let regex=/^\+375\((44|29|25|33)\)\d{7}$/;
    if(regex.test(phoneInput.value)) {
        changeButton.disabled=false;

    }
    else{
        invalidText.textContent='Номер телефона введен в неверном формате : +375(XX)XXXXXXX';
        changeButton.disabled=true;
    }
})

birthdayInput.addEventListener("change", (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector('.invalidBirthday');
    invalidText.textContent='';
    let regex=/^(0[1-9]|1[0-2])\.(0[1-9]|1\d|2[0-9]|3[0-1])\.((19|20)\d{2})$/;
    if(regex.test(birthdayInput.value)) {
        changeButton.disabled=false;
    }
    else{
        console.log('invalid');
        invalidText.textContent='Дата рождения введена в неверном формате : XX.XX.XXXX';
        changeButton.disabled=true;
    }
})

nameInput.addEventListener('change', (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector('.invalidName');
    invalidText.textContent='';
    let regex=/^[A-Za-zА-Яа-яЁё]+$/;
    if(regex.test(nameInput.value)) {
        changeButton.disabled=false;
    }
    else{
        console.log('invalid');
        invalidText.textContent='Имя введено в неверном формате : не должно содержать цифр и специальных символов';
        changeButton.disabled=true;
    }
})

surnameInput.addEventListener('change', (event)=>{
    event.preventDefault();
    let invalidText=document.querySelector('.invalidSurname');
    invalidText.textContent='';
    let regex=/^[A-Za-zА-Яа-яЁё]+$/;
    if(regex.test(surnameInput.value)) {
        changeButton.disabled=false;
    }
    else{
        console.log('invalid');
        invalidText.textContent='Имя введено в неверном формате : не должно содержать цифр и специальных символов';
        changeButton.disabled=true;
    }
})
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


function changeHandler(){
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
}