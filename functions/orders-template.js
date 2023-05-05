$.ajax({
    url: "http://localhost:3000/user/verify",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        token: localStorage.getItem('jwtToken')
    }),
    success: user => {
        $.ajax({
            url: "http://localhost:3000/orders/find",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                userId: user.id
            }),
            success: data => {
                data.forEach(order=>{
                    const orderBlock = ordersTemplate(order);
                    document.querySelector('.order-history').appendChild(orderBlock);
                    $.ajax({
                        url: "http://localhost:3000/productsForOrder/find",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                            orderId: order.id
                        }),
                        success: data => {
                            console.log(data);
                            data.forEach(product=>{
                                console.log(product);
                                orderProductTemplate(product, orderBlock);
                            })
                        }
                    })
                })
            }
        })
    }
})

function ordersTemplate(item){
    let order=document.createElement("div");
    order.classList.add("order-history__order");
    let count=document.createElement("p");
    count.classList.add("order__number");
    count.textContent="Заказ №"+(item.id||"-");
    let date=document.createElement("p");
    date.classList.add("order__date");
    date.textContent="Дата заказа: "+(item.orderTime||"-");
    let deliveryType=document.createElement("p");
    deliveryType.classList.add("order__delivery-type");
    deliveryType.textContent="Способ доставки: "+(item.deliveryType||"-");
    let address=document.createElement("p");
    address.classList.add("order__address");
    address.textContent="Адрес доставки: "+(item.address||"-");
    let paymentType=document.createElement("p");
    paymentType.classList.add("order__payment-type");
    paymentType.textContent="Способ оплаты: "+(item.paymentType||"-");
    let card=document.createElement("p");
    card.classList.add("order__card");
    card.textContent="Карта для оплаты: "+(item.card||"-");
    let compositionText=document.createElement("p");
    compositionText.textContent="Состав: ";
    let composition=document.createElement("div");
    composition.classList.add("order__composition");
    let price=document.createElement("p");
    price.classList.add("order__price");
    price.textContent="Стоимость заказа: "+item.price+" BYN";

    order.appendChild(count);
    order.appendChild(date);
    order.appendChild(deliveryType);
    order.appendChild(address);
    order.appendChild(paymentType);
    order.appendChild(card);
    order.appendChild(compositionText);
    order.appendChild(composition);
    order.appendChild(price);
    return order;
}

function orderProductTemplate(item, orderBlock){
    let container=orderBlock.querySelector(".order__composition")
    let product=document.createElement("div");
    product.classList.add("order__product");
    let img=document.createElement("img");
    img.src=item.img;
    console.log(item.img);
    let title=document.createElement("p");
    title.classList.add("product__title");
    let modifiedInfo;
    if(item.color){
        title.textContent=item.title+'*'+'  x'+item.count;
        modifiedInfo=document.createElement("p");
        modifiedInfo.textContent='* - товар был изменен согласно вашим пожеланиям';
    }
    else{
        title.textContent=item.title+' x'+item.count;
    }
    product.appendChild(img);
    product.appendChild(title);
    container.appendChild(product);
    if(modifiedInfo!==undefined)
    orderBlock.appendChild(modifiedInfo);
}
