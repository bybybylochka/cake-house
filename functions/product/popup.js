let popupBg = document.querySelector('.product__popupbg'); // Фон попап окна
let popup = document.querySelector('.product__popup'); // Само окно

let closePopupButton = document.querySelector('.cross');

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg) { // Если цель клика - фот, то:
        closePopup()
    }
});

closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
    closePopup();
});
let productCards=document.querySelector(".menu__products").childNodes;
productCards.forEach(card=>{
    card.addEventListener('focus', (event)=>{
        event.preventDefault();
        let obj={
            id: card.getAttribute("data-id")
        }
        console.log(obj);
        $.ajax({
            url: 'http://localhost:3000/products/findOne',
            type: 'GET',
            contentType: "application/json",
            data: JSON.stringify(obj),
            success : (data) => {
                console.log(data);
                openPopup(data)
            }
        })
    }, true)
})

function openPopup(product){
            document.body.classList.toggle('lock');
            popup.querySelector('.product__image').src = product.img;
            popup.querySelector('.product__title').textContent=product.title;
            popup.querySelector('.product__composition').textContent+=product.composition;
            popup.querySelector('.product__calorie').textContent+=product.calorieContent+' Ккал';
            popup.querySelector('.product__weight').textContent+=product.weight+" г";
            popup.querySelector('.product__price').textContent=product.price+" BYN";
            if(product.modified===true){
                console.log(product.modified);
                popup.querySelector('.product__modified').style.display='block';
            }
            popupBg.classList.add('active'); // Убираем активный класс с фона
            popup.classList.add('active'); // И с окна
}

function closePopup(){
    document.body.classList.remove('lock');
    popup.querySelector('.product__image').src = '';
    popup.querySelector('.product__title').textContent='';
    popup.querySelector('.product__composition').textContent='Состав: ';
    popup.querySelector('.product__calorie').textContent='Калорийность: ';
    popup.querySelector('.product__weight').textContent='Вес: ';
    popup.querySelector('.product__price').textContent='';
    popup.querySelector('.product__modified').style.display='none';
    popup.querySelector('.quantity').textContent="1";
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
}

