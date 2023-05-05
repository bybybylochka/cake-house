const db = require("../models/index");
const jsonwebtoken = require("jsonwebtoken");
const secret_key=require("./user-controller").secret_key;
const Order = db.order;
const ProductForOrder = db.productsForOrder;
const Op = db.Sequelize.Op;

Order.hasMany(ProductForOrder, {as: "products"})
ProductForOrder.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order"
})


exports.createOrder=(req, res)=>{
    const userId=req.body.id;
    const cartProducts=req.body.cartProducts;
    Order.create({
        userId: userId,
        orderTime: Date.now(),
        readinessTime: Date.now(),
        phoneNumber: req.body.phoneNumber,
        deliveryType: req.body.deliveryType,
        address: req.body.address,
        paymentType: req.body.paymentType,
        card: req.body.card,
        price: req.body.price
    }).then(order => {
        const orderId=order.id;
        cartProducts.forEach(elem=>{
            ProductForOrder.create({
                title: elem.name,
                img: elem.img,
                weight:elem.weight,
                price:elem.price,
                count:elem.count,
                color:elem.color,
                tiersCount:elem.tiersCount,
                decor:elem.decor,
                wishes:elem.wishes,
                orderId: orderId
            }).then(product => {
                res.status(200).json({message: "ok"})
            }).catch(err => {
                console.log(err.message)
            })
        })
    })
}

exports.find=(req, res)=>{
    let userId=req.body.userId;
    Order.findAll({
        where: { userId: userId},
    })
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}

exports.findOne=(req, res)=>{
    let orderId=req.body.orderId;
    Order.findByPk(orderId)
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}

exports.findAll=(req, res)=>{
    Order.findAll({
        include: [{model: ProductForOrder, as: "products"}]
    })
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}
