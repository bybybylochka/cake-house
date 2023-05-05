module.exports = (sequelize, Sequelize) => {
    const Promocode = sequelize.define("promocode", {
        code: {
            type: Sequelize.STRING,
            required: true,
        },
        discountPercent: {
            type: Sequelize.INTEGER,
            required: true
        }
    });
    return Promocode;
}