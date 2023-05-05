module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey:true,
            type: Sequelize.INTEGER,
        },
        img:{
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        type:{
            type:Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.INTEGER
        },
        composition:{
            type: Sequelize.STRING
        },
        calorieContent:{
            type: Sequelize.INTEGER
        },
        price:{
            type: Sequelize.FLOAT
        },
        modified:{
            type:Sequelize.BOOLEAN
        }
    });

    return Product;
};