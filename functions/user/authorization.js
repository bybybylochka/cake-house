let authenticationButton = document.getElementById('auth_button');
authenticationButton.addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/user/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            mail: document.getElementById('mail').value,
            password: document.getElementById('password').value
        }),
        success: (data) => {
                localStorage.setItem('jwtToken', data.token);
                console.log(data.token);
                if(data.token==="admin"){
                    window.location.href="http://localhost:63342/cake-house/pages/admin_account.html";
                }
                else{
                    window.location.href="http://localhost:63342/cake-house/pages/main_page.html";
                }

        },
        error: (xhr,err)=>{
            if(xhr.responseText==='wrong password'||xhr.responseText==='wrong login'){
                alert("Неверный логин или пароль!");
            }
        }

    })
})