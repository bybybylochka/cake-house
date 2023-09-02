const db = require("../models/index");
const Product = db.products;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    const product = {
        img: req.body.product_img,
        title: req.body.product_title,
        type: req.body.product_type,
        description: req.body.product_description,
        weight: req.body.product_weight,
        composition: req.body.product_composition,
        calorieContent: req.body.product_calorie,
        modified: req.body.product_modified,
        price: req.body.product_price
    };
    if(req.files) {
        product.img = '../' + req.files[0].path
    }
    Product.create(product)
        .then(data => {
            res.redirect("http://localhost:63342/cake-house/pages/admin_account.html");
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};


exports.findAll = (req, res) => {
    Product.findAll()
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
};


exports.findOne = (req, res) => {
    const id = Number(req.body.id);
    Product.findByPk(id)
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({
                    message: `Cannot find Product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving Product with id=" + id
            });
        });
};

exports.findType=(req, res)=>{
    const productType=req.body.productType;
    Product.findAll({
        where: { type: productType}
    })
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}


exports.update = (req, res) => {
    const id = req.body.id;
    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            res.send({
                message: "Product was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.body.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            res.send({
                message: "Product was deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};


