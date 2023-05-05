const db = require("../models/index");
const jsonwebtoken = require("jsonwebtoken");
const secret_key=require("./user-controller").secret_key;
const Address = db.addresses;
const User = db.users;
const Op = db.Sequelize.Op;

User.hasMany(Address, {as: "addresses"})
Address.belongsTo(User, {
    foreignKey: "userId",
    as: "address"
})

exports.createAddress=(req, res)=>{
    let userId=req.body.id;
    const address=req.body.address;
    Address.create({
        userId: userId,
        street: address.street,
        houseNumber: address.houseNumber,
        apartmentNumber: address.apartmentNumber,
    }).then(address => {
        res.status(200).json({message: "ok"})
    }).catch(err => {
        console.log(err.message)
    })

}

exports.find=(req, res)=>{
    let userId=req.body.userId;
    Address.findAll({
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