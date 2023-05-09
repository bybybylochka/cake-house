$(document).ready(()=>{
    let $adminData =$('.account__wrapper');
    $('#orders').click(()=>{
        $adminData.innerHTML='';
        $adminData.load('../pages/admin_templates/orders_template.html');
    });
    $('#users').click(()=>{
        $adminData.innerHTML='';
        $adminData.load('../pages/admin_templates/users_template.html');
    });
    $('#promocodes').click(()=>{
        $adminData.innerHTML='';
        $adminData.load('../pages/admin_templates/promocodes_template.html');
    });
    $('#products').click(()=>{
        $adminData.innerHTML='';
        $adminData.load('../pages/admin_templates/products_template.html');
    })
})

let logoutButton=document.getElementById("logout");
logoutButton.addEventListener('click', (event)=>{
    event.preventDefault();
    localStorage.removeItem("jwtToken");
    window.location.href="../../pages/main_page.html";
})