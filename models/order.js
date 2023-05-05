module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey:true,
            type: Sequelize.INTEGER,
        },
        userId:{
            type: Sequelize.INTEGER
        },
        orderTime: {
            type: Sequelize.DATE
        },
        phoneNumber:{
            type: Sequelize.STRING
        },
        deliveryType:{
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        paymentType:{
            type: Sequelize.STRING
        },
        card:{
            type: Sequelize.STRING
        },
        price:{
            type:Sequelize.FLOAT
        }
    });

    return Order;
};