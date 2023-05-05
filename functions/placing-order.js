$(document).ready(()=> {
    let $info =$('.order__information');
    $('#contacts').click(()=>{
        $info.innerHTML='';
        $info.load('../pages/order_templates/contacts_template.html');
    });
    $('#delivery').click(()=>{
        $info.innerHTML='';
        $info.load('../pages/order_templates/delivery_template.html');
    });
    $('#payment').click(()=>{
        $info.innerHTML='';
        $info.load('../pages/order_templates/card_template.html');
    });
})