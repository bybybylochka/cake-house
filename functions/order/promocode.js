
let promocodeButton = document.querySelector('#apply-promocode');
promocodeButton.addEventListener('click', (event) => {
    event.preventDefault();
    let promocodeFieldName = document.querySelector('.promocode');
    console.log(promocodeFieldName.value)
    $.ajax({
        url: "http://localhost:3000/promocodes/find",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            code: promocodeFieldName.value
        }),
        success: promocode => {
            console.log(promocode);
            const discount = promocode.discountPercent;
            console.log(discount);
            let price=(+document.querySelector(".cart__price p").textContent.split(" ")[1]);
            console.log(price - (discount*price)/100);
            let price_field = document.querySelector('.cart__price p');
            price_field.textContent = "Итого: "+String(price - (discount*price)/100)+" BYN";

        },
        error: (err) => {
            alert(err);
        }
    })
})