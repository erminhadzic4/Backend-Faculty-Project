const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const StudentPredmet = sequelize.define('StudentPredmet', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        studentId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Student',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        predmetId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Predmet',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },{
        indexes: [
          {
            unique: false,
            fields: ['studentId','predmetId']
          }
        ]
    });
    return StudentPredmet;
};
