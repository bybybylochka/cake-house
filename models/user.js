module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey:true,
            type: Sequelize.INTEGER,
        },
        mail:{
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING
        },
        surname:{
            type: Sequelize.STRING
        },
        birthday:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        costOfPurchases:{
            type: Sequelize.FLOAT
        }
    });

    return User;
};