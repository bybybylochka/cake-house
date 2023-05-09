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
            if(!data){
                console.log("no user");
            }
            localStorage.setItem('jwtToken', data);
            console.log("authorized");
            if(data==="admin"){
                window.location.href="../../pages/admin_account.html";
            }
            else{
                window.location.href="../../pages/main_page.html";
            }
        }
        // error:(err)=>{
        //
        //     // let invalidText=document.querySelector('.invalidAuthorizationData');
        //     // invalidText.textContent='Неверный логин или пароль';
        //
        // }
    })
})