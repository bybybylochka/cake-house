

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
            userId=user.id;
            let but=document.querySelector(".button_not-authorized");
            but.classList.replace("button_not-authorized", "button_authorized");
            but.querySelector(".button_text").textContent=user.mail;
            but.querySelector(".link-button").href="personal_account.html";
        }

    })
})