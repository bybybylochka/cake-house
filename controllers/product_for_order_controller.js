const db = require("../models/index");
const ProductForOrder = db.productsForOrder;
const Op = db.Sequelize.Op;

exports.find=(req, res)=>{
    let orderId=req.body.orderId;
    ProductForOrder.findAll({
        where: { orderId: orderId}
    })
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}