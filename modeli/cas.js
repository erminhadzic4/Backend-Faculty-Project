const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Cas = sequelize.define('Cas', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        redniBroj: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        tip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sedmica: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        predmetId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Cas;
};