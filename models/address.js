module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        street:{
            type: Sequelize.STRING
        },
        houseNumber:{
            type: Sequelize.INTEGER
        },
        apartmentNumber:{
            type: Sequelize.INTEGER
        },
        userId:{
            type: Sequelize.INTEGER
        }
    });

    return Address;
};