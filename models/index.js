const dbConfig = require("../config/db-config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product")(sequelize, Sequelize);
db.users=require("./user")(sequelize, Sequelize);
db.productsForOrder=require("./product_for_order")(sequelize, Sequelize);
db.order=require("./order")(sequelize, Sequelize);
db.addresses=require("./address")(sequelize, Sequelize);
db.cards=require("./card")(sequelize, Sequelize);
db.promocodes=require("./promocode")(sequelize, Sequelize);


module.exports = db;