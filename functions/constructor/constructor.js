const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const param1 = urlParams.get('productName');
const param2 = urlParams.get('price');
const param3=urlParams.get('image');


let productImage=document.querySelector('.constructor__image img');
let productTitle=document.querySelector(".constructor__name");
let productPrice=document.querySelector(".constructor__price");
productTitle.textContent=param1;
productPrice.textContent=param2;
productImage.src=param3;
console.log(productImage);

let weight=document.getElementById("weight");
weight.addEventListener("change", (event)=>{
    event.preventDefault();
    calculatePriceOfConstructor(weight, tiers, decoration);
});
let tiers=document.getElementById("tiers");
tiers.addEventListener("change", (event)=>{
    event.preventDefault();
    calculatePriceOfConstructor(weight, tiers, decoration);
});
let decoration=document.getElementById("decoration");
decoration.addEventListener("change",(event)=>{
    event.preventDefault();
    calculatePriceOfConstructor(weight, tiers, decoration);
})
let color=document.getElementById("color");
color.style.height='61.6px'
color.addEventListener("change", (event)=>{
    event.preventDefault();
})

let basic_price=+productPrice.textContent;

function calculatePriceOfConstructor(weight, tiers, decoration){
    let optionsNodeWeight=weight.querySelectorAll("option");
    let optionsNodeTiers=tiers.querySelectorAll("option");
    let optionsNodeDecor=decoration.querySelectorAll("option");
    let optionsWeight=[];
    optionsNodeWeight.forEach(option=>{
        optionsWeight.push(option.textContent);
    })
    let optionsTiers=[];
    optionsNodeTiers.forEach(option=>{
        optionsTiers.push(option.textContent);
    })
    let optionsDecor=[];
    optionsNodeDecor.forEach(option=>{
        optionsDecor.push(option.textContent);
    })
    let selectedWeight=weight.value;
    let selectedTiers=tiers.value;
    let selectedDecor=decoration.value;
    let indexWeight=optionsWeight.indexOf(selectedWeight);
    let indexTiers=optionsTiers.indexOf(selectedTiers);
    let indexDecor=optionsDecor.indexOf(selectedDecor);
    let new_price=basic_price+basic_price*(indexWeight)/10+basic_price*(indexTiers)/10+basic_price*(indexDecor)/10;
    productPrice.textContent=new_price;
}