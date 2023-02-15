const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Prisustvo = sequelize.define('Prisustvo', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        casId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Prisustvo;
};