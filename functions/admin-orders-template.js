
    let orderContainer=document.querySelector(".orders__content");
    let findOrderButton=document.getElementById("find_order");
    let findOrderInput=document.getElementById("find-order");
    let showAllButton=document.getElementById("show-all_order");
    showOrders();
    function showOrders(){
        $.ajax({
            url: "http://localhost:3000/user/verify",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token: localStorage.getItem('jwtToken')
            }),
            success: user => {
                $.ajax({
                    url: "http://localhost:3000/orders/",
                    type: "GET",
                    contentType: "application/json",
                    success: data => {
                        console.log(data);
                        data.sort((a,b) => new Date(b.orderTime) - new Date(a.orderTime))
                        console.log(data);
                        let orderTable=createOrdersTable(data);
                        orderContainer.appendChild(orderTable);
                    }
                })
            }
        })
    }

    findOrderButton.addEventListener("click", (event)=>{
        event.preventDefault();
        let orderId=findOrderInput.value;
        showAllButton.style.display="block";
        $.ajax({
            url: "http://localhost:3000/orders/findById",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                orderId: orderId
            }),
            success: order => {
                const orderBlock = ordersTemplate(order);
                orderContainer.innerHTML='';
                orderContainer.appendChild(orderBlock);
                $.ajax({
                    url: "http://localhost:3000/productsForOrder/find",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        orderId: order.id
                    }),
                    success: data => {
                        data.forEach(product=>{
                            orderProductTemplate(product, orderBlock);
                        })
                    }
                })
            }
        })
    })

    showAllButton.addEventListener("click", (event)=>{
        event.preventDefault();
        orderContainer.innerHTML='';
        showOrders();
        showAllButton.style.display="none";
    })
    function createOrdersTable(orders){
        let table=createTable(["Номер заказа","Дата заказа","Состав заказа","Общая стоимость заказа"]);
        orders.forEach(order=>{
            let tr=document.createElement("tr");
            let td_id=document.createElement("td");
            td_id.textContent=order.id;
            let td_date=document.createElement("td");
            td_date.textContent=order.orderTime;
            let td_composition=document.createElement("td");
            let products='';
            order.products.forEach(product=>{
                products+=product.title+" x"+product.count;
                if(product.color){
                    products+=" (изменено)";
                    //products+=" (цвет:"+product.color+", кол-во ярусов:"+product.tiersCount+", декор:"+product.decor+", пожелания:"+product.wishes+")";
                }
            });
            td_composition.textContent=products;
            let td_price=document.createElement("td");
            td_price.textContent=order.price;
            tr.appendChild(td_id);
            tr.appendChild(td_date);
            tr.appendChild(td_composition);
            tr.appendChild(td_price);
            table.appendChild(tr);
        })
        return table;
    }



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
        // let promocode=document.createElement("p");
        // promocode.classList.add("order__promo-code");
        // promocode.textContent="Промокод: "+item.promocode;
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
        // order.appendChild(promocode);
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
        title.textContent=item.title;
        product.appendChild(img);
        product.appendChild(title);
        if(item.color){
            let p=document.createElement("p");
            p.textContent="цвет:"+item.color+", кол-во ярусов:"+item.tiersCount+", декор:"+item.decor+", пожелания:"+item.wishes;
            product.appendChild(p);
        }
        container.appendChild(product);
    }