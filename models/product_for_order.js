module.exports = (sequelize, Sequelize) => {
    const ProductForOrder = sequelize.define("productForOrder", {
        img: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.INTEGER
        },
        price:{
            type: Sequelize.FLOAT
        },
        count:{
            type:Sequelize.INTEGER
        },
        color:{
            type: Sequelize.STRING
        },
        tiersCount:{
            type:Sequelize.INTEGER
        },
        decor:{
            type:Sequelize.STRING
        },
        wishes:{
            type:Sequelize.STRING
        }
    });
    return ProductForOrder;
};