const db = require('./baza.js');
db.sequelize.sync({ force: true })
.then(() => console.log('Tabele napravljene uspjesno'))
.catch(err => console.error('Greska pri kreiranju tabela:', err));