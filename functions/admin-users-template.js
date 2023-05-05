let usersContainer=document.querySelector(".users__content");
let sortUsersButton=document.getElementById("sort_users");
let users=[];

showUsers();

function showUsers(){
    $.ajax({
        url: "http://localhost:3000/user/verify",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem('jwtToken')
        }),
        success: user => {
            $.ajax({
                url: "http://localhost:3000/user/",
                type: "GET",
                contentType: "application/json",
                success: data => {
                    users=data;
                    let usersTable=createUsersTable(data);
                    usersContainer.appendChild(usersTable);
                }
            })
        }
    })
}

sortUsersButton.addEventListener("click",(event)=>{
    event.preventDefault();
    users.sort((a,b)=>b.costOfPurchases-a.costOfPurchases);
    usersContainer.innerHTML='';
    let newTable=createUsersTable(users);
    usersContainer.appendChild(newTable);
})
function createUsersTable(users){
    let table=createTable(["Электронная почта","Номер телефона","Фамилия и Имя","Общая стоимость покупок"]);
    users.forEach(user=>{
        let tr=document.createElement("tr");
        let td_mail=document.createElement("td");
        td_mail.textContent=user.mail;
        let td_tel=document.createElement("td");
        td_tel.textContent=user.phoneNumber;
        let td_name=document.createElement("td");
        let name='';
        if(!user.name || !user.surname){
            name='-';
        }
        else{
            name=user.name+' ' +user.surname;
        }
        td_name.textContent=name;
        let td_cost=document.createElement("td");
        td_cost.textContent=user.costOfPurchases+" BYN";
        tr.appendChild(td_mail);
        tr.appendChild(td_tel);
        tr.appendChild(td_name);
        tr.appendChild(td_cost);
        table.appendChild(tr);
    })
    return table;
}