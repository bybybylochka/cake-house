const db = require("../models/index");
const Promocode = db.promocodes;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    Promocode.create({
        code: req.body.code,
        discountPercent: req.body.discountPercent
    }).then(response => {
        res.send(response)
    }).catch(err => {
        console.log(err)
    })
}

exports.findAll = (req, res) => {
    Promocode.findAll()
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.findByCode = (req, res) => {
    const code = req.body.code;
    Promocode.findOne({
        where: {code: code}
    }).then(response => {

        res.json(response)
    }).catch(err => {
        res.status(500).send("Промокод не найден")
    })
}

exports.destroy = (req, res) => {
    const code = req.body.code;
    Promocode.destroy({
        where: {code: code},
    }).then(() => {
        res.send("Промокод успешно удален")
    }).catch(err => {
        console.log(err)
    })
}