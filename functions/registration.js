let registrationButton = document.getElementById('reg-button');
registrationButton.addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000/user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            mail: document.getElementById('mail').value,
            phoneNumber: document.getElementById('phone').value,
            password: document.getElementById('password').value
        }),
        success: (data) => {
            localStorage.setItem('jwtToken', data);
            window.location.href = "http://localhost:63342/cake-house/pages/main_page.html"
        }
    })
})