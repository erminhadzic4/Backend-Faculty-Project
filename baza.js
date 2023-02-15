const Sequelize = require("sequelize");
const sequelize = new Sequelize("spirala4", "root", "", {
   host: "127.0.0.1",
   dialect: "mysql",
   underscored: true
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require(__dirname+ "/modeli/student.js")(sequelize, Sequelize.DataTypes);
db.Predmet =  require(__dirname+ "/modeli/predmet.js")(sequelize, Sequelize.DataTypes);
db.Prisustvo = require(__dirname+ "/modeli/prisustvo.js")(sequelize, Sequelize.DataTypes);
db.Cas = require(__dirname+ "/modeli/cas.js")(sequelize, Sequelize.DataTypes);
db.StudentPredmet = require(__dirname+ "/modeli/studentPredmet.js")(sequelize, Sequelize.DataTypes);

//pravljenje 1-N relacije sa Prisustvo tabelom
db.Student.hasMany(db.Prisustvo, { foreignKey: 'studentId' });
db.Prisustvo.belongsTo(db.Student, { foreignKey: 'studentId' });
 
//pravljenje 1-N relacije sa Cas tabelom
db.Prisustvo.belongsTo(db.Cas, { foreignKey: 'casId' });
db.Cas.hasMany(db.Prisustvo, { foreignKey: 'casId' });
 
//pravljenje 1-N relacije sa Predmet tabelom
db.Cas.belongsTo(db.Predmet, { foreignKey: 'predmetId' });
db.Predmet.hasMany(db.Cas, { foreignKey: 'predmetId' });

 //pravljenje N:M relacije sa međutabelom
db.Student.belongsToMany(db.Predmet, { through: db.StudentPredmet, foreignKey: 'studentId' });
db.Predmet.belongsToMany(db.Student, { through: db.StudentPredmet, foreignKey: 'predmetId' });

module.exports = db;