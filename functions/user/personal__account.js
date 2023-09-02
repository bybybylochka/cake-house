$(document).ready(()=>{
    let $personalData =$('.account__wrapper');
    $('#personal-data').click(()=>{
        $personalData.innerHTML='';
        $personalData.load('../../pages/account_templates/personal_data_template.html');
    });
    $('#addresses').click(()=>{
        $personalData.innerHTML='';
        $personalData.load('../../pages/account_templates/addresses_template.html');
    });
    $('#cards').click(()=>{
        $personalData.innerHTML='';
        $personalData.load('../../pages/account_templates/cards_template.html');
    });
    $('#orders').click(()=>{
        $personalData.innerHTML='';
        $personalData.load('../../pages/account_templates/orders_template.html');
    })
})

let logoutButton=document.getElementById("logout");
logoutButton.addEventListener('click', (event)=>{
    event.preventDefault();
    localStorage.removeItem("jwtToken");
    window.location.href="http://localhost:63342/cake-house/pages/main_page.html";
})



