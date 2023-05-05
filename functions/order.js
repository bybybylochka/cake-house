let orderButton = document.getElementById('order-button');
let inf=document.querySelector(".order__information");
let Price=document.querySelector(".cart__price p");
let costOfPurchases=0;

orderButton.addEventListener('click', (event) => {
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
                url: "http://localhost:3000/user/findById",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    id: user.id
                }),
                success: data=>{
                    costOfPurchases=data.costOfPurchases;
                    const cartId="cart"+user.id;
                    let cart = JSON.parse(localStorage.getItem(cartId))||[];
                    cart.forEach(elem=>{
                        elem.weight=Number(elem.weight.split(' ')[1]);
                        elem.price=Number(elem.price.split(' ')[0]);
                    });
                    let obj={
                        id: user.id,
                        cartProducts: cart,
                        phoneNumber: inf.getAttribute("data-phonenumber"),
                        deliveryType: inf.getAttribute("data-deliverytype"),
                        address: inf.getAttribute("data-deliveryaddress"),
                        paymentType: inf.getAttribute("data-paymenttype"),
                        card: inf.getAttribute("data-cardnumber"),
                        price: Price.textContent.split(' ')[1]
                    }
                    $.ajax({
                        url: "http://localhost:3000/orders/create",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(obj),
                        success: (data) => {
                            $.ajax({
                                url: "http://localhost:3000/user/update",
                                type: "POST",
                                contentType: "application/json",
                                data: JSON.stringify({
                                    id: user.id,
                                    costOfPurchases: (+costOfPurchases)+(+Price.textContent.split(" ")[1])
                                })
                            })

                            localStorage.removeItem(cartId);
                            window.location.href = "http://localhost:63342/cake-house/pages/main_page.html"
                        }
                    })
                }
            })

        }
    })
})