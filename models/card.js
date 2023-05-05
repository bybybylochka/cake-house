module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        cardNumber:{
            type: Sequelize.STRING
        },
        cardOwner:{
            type: Sequelize.STRING
        },
        validityPeriod:{
            type: Sequelize.STRING
        },
        userId:{
            type: Sequelize.INTEGER
        }
    });

    return Card;
};