const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define('Predmet', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kod: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    });
    return Predmet;
};