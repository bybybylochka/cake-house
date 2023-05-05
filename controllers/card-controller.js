const db = require("../models/index");
const jsonwebtoken = require("jsonwebtoken");
const secret_key=require("./user-controller").secret_key;
const Card = db.cards;
const User = db.users;
const Op = db.Sequelize.Op;

User.hasMany(Card, {as: "cards"})
Card.belongsTo(User, {
    foreignKey: "userId",
    as: "card"
})

exports.createCard=(req, res)=>{
    let userId=req.body.id;
    const card=req.body.card;
    Card.create({
        userId: userId,
        cardNumber: card.cardNumber,
        cardOwner: card.cardOwner,
        validityPeriod: card.validityPeriod,
    }).then(card => {
        res.status(200).json({message: "ok"})
    }).catch(err => {
        console.log(err.message)
    })

}

exports.find=(req, res)=>{
    let userId=req.body.userId;
    Card.findAll({
        where: { userId: userId}
    })
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}