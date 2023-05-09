const db = require("../models/index");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const secret_key = "secret";

exports.secret_key=secret_key;

exports.register=(req, res, next)=> {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.create({
            mail: req.body.mail,
            phoneNumber: req.body.phoneNumber,
            password: hash,
            costOfPurchases: 0
        })
            .then(data => {
                const jwtToken = jsonwebtoken.sign({
                    id: data.id,
                    mail: data.mail,
                    password: data.password
                }, secret_key);
                res.send(jwtToken)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
    })
}

exports.login = (req, res) => {
    const password = req.body.password;
    const mail = req.body.mail;
    if(mail==="admin_mail@mail.ru"&&password==="administration"){
        res.send("admin");
    }
    else {
        User.findOne({
            where: {mail: mail}
        })
            .then(async user => {

                if (await bcrypt.compare(password, user.password)) {
                    const jwtToken = jsonwebtoken.sign({
                        id: user.id,
                        mail: user.mail,
                        password: user.password
                    }, secret_key);
                    res.send(jwtToken)
                } else {
                    res.status(500).send({message: "wrong password"})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    message:
                        err.message || "wrong mail"
                });
            })
    }
}


exports.checkAuthorization = (req, res, next) => {
    res.send(req.session);
}

exports.update = (req, res) => {
    const id = req.body.id;
    User.update(req.body, {
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

////////////////////////////////////////////////////////////////////////////////////////////


exports.findByEmail=(req, res)=>{
    const mail=req.body.mail;
    User.findAll({
        where: { mail: mail}
    })
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the User."
            });
        })
}

exports.findById=(req, res)=>{
    const id = Number(req.body.id);
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving User with id=" + id
            });
        });
}


exports.verify=(req, res)=>{
    const token=req.body.token;
    if(token==="admin"){
        res.json("admin");
    }
    else{
        try {
            const user=jsonwebtoken.verify(token, secret_key);
            res.json(user);
        }
        catch{
            res.redirect("http://localhost:63342/cake-house/pages/entry.html");
        }
    }
}

exports.findAll=(req, res)=>{
    User.findAll()
        .then(response => res.json(response))
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the Product."
            });
        })
}