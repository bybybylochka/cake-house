let tbody=document.getElementsByTagName("tbody")[0];
let idCart='';
document.addEventListener("DOMContentLoaded", (event)=>{
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/user/verify',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            token: localStorage.getItem("jwtToken")
        }),
        success : (user) => {
            console.log(user);
            idCart="cart"+ user.id;
            let cart = JSON.parse(localStorage.getItem(idCart))||[];

                let cost=0;
                cart.forEach(elem=> {
                    console.log(elem);
                    let tr=createProductCartTemplate(elem, idCart);
                    tbody.appendChild(tr);
                    cost+=(+elem.price.split(' ')[0])*(+elem.count);
                })
                document.querySelector(".cart__price p").textContent="Итого: "+cost+" BYN";
                document.querySelector(".order__information").setAttribute("price", "Итого: "+cost+" BYN");
                $(document).ready(()=> {
                    let $info =$('.order__information');
                    $('#order-button').click(()=>{
                        $info.innerHTML='';
                        $info.load('../pages/order_templates/contacts_template.html');
                    });
                });

        },
        error: (err)=>{

                document.querySelector(".order__information").innerHTML='';
                let p=document.createElement("p");
                p.textContent="Корзина пуста(";
                p.style.textAlign='center';
                document.querySelector(".order__information").appendChild(p);

    }
    })
})

function createProductCartTemplate(elem, id){
    let tr=document.createElement("tr");
    tr.classList.add("cart__product");
    let product=document.createElement("td");
    product.classList.add("product");
    let product_img=document.createElement("img");
    product_img.classList.add("product__image");
    product_img.src=elem.img;
    let description=document.createElement("div");
    description.classList.add("product__short-description");
    let h=document.createElement("h5");
    h.classList.add("product__title");
    h.textContent=elem.name;
    let weight=document.createElement("p");
    weight.classList.add("product__weight");
    weight.textContent=elem.weight
    description.appendChild(h);
    description.appendChild(weight);
    product.appendChild(product_img);
    product.appendChild(description);
    tr.appendChild(product);

    let quantity=document.createElement("td");
    quantity.classList.add("product__quantity");
    let decrease=document.createElement("div");
    decrease.classList.add("quantity__decrease");
    decrease.textContent="<";
    let quan=document.createElement("div");
    quan.classList.add("quantity");
    quan.textContent=elem.count;
    let increase=document.createElement("div");
    increase.classList.add("quantity__increase");
    increase.textContent=">";
    quantity.appendChild(decrease);
    quantity.appendChild(quan);
    quantity.appendChild(increase);
    tr.appendChild(quantity);
    addQuantityChangingEventListeners(quantity);

    let price=document.createElement("td");
    price.classList.add("product__price");
    let p=document.createElement("p");
    p.textContent=elem.price;
    price.appendChild(p);
    tr.appendChild(price);

    let remover=document.createElement("td");
    remover.classList.add("product__remover");
    let cross=document.createElement("img");
    cross.src="../resource/x.png";
    remover.appendChild(cross);
    cross.addEventListener("click", (event)=>{
        let trToRemove=cross.parentElement.parentElement;
        let trs=tbody.querySelectorAll("tr");
        let count=0;
        let index=-1;
        trs.forEach(tr=>{
            if(tr===trToRemove){
                index=count;
            }
            count++;
        })
        console.log(index);
        let cart=JSON.parse(localStorage.getItem(id));
        cart.splice(index, 1);
        localStorage.setItem(id, JSON.stringify(cart));
        tbody.removeChild(trToRemove);
        calculateCost();
    })
    tr.appendChild(remover);

    return tr;
}

function addQuantityChangingEventListeners(productQuantity) {
    console.log(productQuantity);
    let quantity=productQuantity.querySelector(".quantity");
    let tr=productQuantity.parentElement;


    let increase=productQuantity.querySelector(".quantity__increase");
    let decrease=productQuantity.querySelector(".quantity__decrease");
    decrease.addEventListener("click", (event)=> {
        let cart=JSON.parse(localStorage.getItem(idCart));
        let trs=tbody.querySelectorAll("tr");
        let kol=0;
        let index=-1;
        trs.forEach(elem=>{
            if(elem===tr){
                index=kol;
            }
            kol++;
        })
        let count = productQuantity.querySelector(".quantity").textContent;
        event.preventDefault();
        if(count<=9 && count>=2) {
            quantity.textContent = --count;
            cart[index].count--;

            localStorage.setItem(idCart, JSON.stringify(cart));
            calculateCost();
        }

    })
    increase.addEventListener("click", (event)=>{
        let count = productQuantity.querySelector(".quantity").textContent;
        event.preventDefault();
        let cart=JSON.parse(localStorage.getItem(idCart));
        let trs=tbody.querySelectorAll("tr");
        let kol=0;
        let index=-1;
        trs.forEach(elem=>{
            if(elem===tr){
                index=kol;
            }
            kol++;
        })
        if(count<=8 && count>=1) {
            quantity.textContent = ++count;
            cart[index].count++;

            localStorage.setItem(idCart, JSON.stringify(cart));
            calculateCost();
        }

    })
}

function calculateCost(){
    let cart = JSON.parse(localStorage.getItem(idCart))||[];
    let cost=0;
    cart.forEach(elem=>{
        cost+=(+elem.price.split(' ')[0])*(+elem.count);
    })
    let price=document.querySelector(".cart__price p").textContent="Итого: "+cost+" BYN";
    document.querySelector(".order__information").setAttribute("price", price);
}