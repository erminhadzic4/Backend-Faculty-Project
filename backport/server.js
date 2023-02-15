const fs = require('fs');
const Predmet = require('./scripts/predmet');

const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function dajStudentInfo(index) {
    let data = fs.readFileSync('studenti.csv', 'utf8');
    let redovi = data.split('\n');
    for (let i = 0; i < redovi.length; i++) {
        let red = redovi[i].split(',');
        if (red[2] == index) {
            return red;
        }
    }
}

app.get('/', (req,res) => {
    res.sendFile(__dirname+"/public/unosPredmeta.html");
 });
 
 app.post('/student', (req,res) => {
    fs.readFile('studenti.csv', 'utf8', function (err, data) {
        if (err) throw err;
        let parametri = req.body;
        let redovi = data.split('\n');
        if (parametri['ime'] == "" || parametri['prezime'] == "" || parametri['index'] == "") {
            res.setHeader('content-type','application/json');
            res.status(409);
            res.send(JSON.stringify({status: 'Nepotpune informacije!'}));
            return;
        }
        else
        for (let i = 0; i < redovi.length; i++) {
            let red = redovi[i].split(',');
            if (red[2] == parametri['index']) {
                res.setHeader('content-type','application/json');
                res.status(409);
                res.send(JSON.stringify({status: 'Student sa indexom ' + red[2] + ' vec postoji!'}));
                return;
            }
        }
        let linija = parametri['ime'] + ',' + parametri['prezime'] + ',' + parametri['index'];
        fs.appendFile('studenti.csv', linija + '\n' , function(err) {
            if (err) throw err;
            res.setHeader('content-type','application/json');
            res.status(200);
            res.send(JSON.stringify({status: 'Kreiran student!'}));
        })
    })
 }) 

 app.post('/predmet', (req,res) => {
    fs.readFile('predmeti.csv', 'utf8', function (err, data) {
        if (err) throw err;
        let parametri = req.body;
        let redovi = data.split('\n');
        if (parametri['naziv'] == "" || parametri['kod'] == "") {
            res.setHeader('content-type','application/json');
            res.status(409);
            res.send(JSON.stringify({status: 'Nepotpune informacije!'}));
            return;
        }
        else
        for (let i = 0; i < redovi.length; i++) {
            let red = redovi[i].split(',');
            if (red[1] == parametri['kod']) {
                res.setHeader('content-type','application/json');
                res.status(409);
                res.send(JSON.stringify({status: 'Predmet sa kodom ' + red[1] + ' vec postoji!'}));
                return;
            }
        }
        var provjera = new Predmet();
        if (!provjera.provjeriKodPredmeta((parametri['kod']))) {
            res.setHeader('content-type','application/json');
            res.status(409);
            res.send(JSON.stringify({status: 'Kod predmeta nije ispravan!'}));
            return;
        }
        let linija = parametri['naziv'] + ',' + parametri['kod'];
        fs.appendFile('predmeti.csv', linija + '\n' , function(err) {
            if (err) throw err;
            res.setHeader('content-type','application/json');
            res.status(200);
            res.send(JSON.stringify({status: 'Kreiran predmet!'}));
        })
    })
}) 

app.post('/prisustvo', (req,res) => {
    let parametri = req.body;
    if (parametri['tipCasa'] == "" || parametri['redniBrojCasa'] == "" || parametri['sedmica'] == "" ||
        parametri['kodPredmeta'] == "" || parametri['indexStudenta'] == "" || parametri['statusPrisustva'] == "") {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Nepotpune informacije!'}));
        return;
    }
    if (parametri['statusPrisustva'] !== 'prisutan' && 
    parametri['statusPrisustva'] !== 'odsutan' && 
    parametri['statusPrisustva'] !== 'nijeUneseno') {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Status prisustva nije ispravan!'}));
    }
    else if (parametri['sedmica'] < 1 || parametri['sedmica'] > 15) {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Sedmica mora biti u rasponu [1,15]!'}));
    }
    else {
        fs.readFile('predmeti.csv', 'utf8', function (err, data) {
            if (err) throw err;
            let redovi = data.split('\n');
            let postoji_kod = false;
            for (let i = 0; i < redovi.length; i++) {
                let red = redovi[i].split(',');
                if (red[1] == parametri['kodPredmeta']) {
                    postoji_kod = true;
                    break;
                }
            }
            if (!postoji_kod) {
                res.setHeader('content-type','application/json');
                res.status(401);
                res.send(JSON.stringify({status: 'Kod predmeta ne postoji!'}));
            } else {
                fs.readFile('studenti.csv', 'utf8', function (err, data) {
                    if (err) throw err;
                    let redovi = data.split('\n');
                    let postoji_student = false;
                    for (let i = 0; i < redovi.length; i++) {
                        let red = redovi[i].split(',');
                        if (red[2] === parametri['indexStudenta']) {
                            postoji_student = true;
                            break;
                        }
                    }
                    if (!postoji_student) {
                        res.setHeader('content-type','application/json');
                        res.status(401);
                        res.send(JSON.stringify({status: 'Student ne postoji!'}));
                    }
                    else {
                        fs.readFile('prisustva.csv', 'utf8', function (err, data) {
                            if (err) throw err;
                            let redovi = data.split('\n');
                            let vec_postoji = false;
                            let index;
                            for (let i = 0; i < redovi.length; i++) {
                                let red = redovi[i].split(',');
                                if (red[0] == parametri['tipCasa'] && red[1] == parametri['redniBrojCasa'] && red[2] == parametri['sedmica'] &&
                                    red[3] == parametri['kodPredmeta'] && red[4] == parametri['indexStudenta']) {
                                        vec_postoji = true;
                                        index = i;
                                    }
                            }
                            let novi = parametri['tipCasa'] + ',' + parametri['redniBrojCasa'] + ',' + parametri['sedmica'] + ','
                            + parametri['kodPredmeta'] + ',' + parametri['indexStudenta'] + ',' + parametri['statusPrisustva'];
                            if (vec_postoji) {
                                var reg = new RegExp(redovi[index]);
                                let linija = data.replace(reg, novi);
                                fs.writeFile('prisustva.csv', linija, 'utf8', (err) => {
                                    if (err) throw err;
                                });
                                res.setHeader('content-type','application/json');
                                res.status(200);
                                res.end(JSON.stringify({status: 'Azurirano prisustvo!'}));
                            } 
                            else {
                                fs.appendFile('prisustva.csv', novi + '\n' , function(err) {
                                    if (err) throw err;
                                    res.setHeader('content-type','application/json');
                                    res.status(200);
                                    res.end(JSON.stringify({status: 'Kreirano prisustvo!'}));
                                })
                            }
                        })
                    }
                })
            }
        })
    }   
}) 

app.get('/prisustvo', (req,res) => {
    const query = req.query;
    const studentInfo = dajStudentInfo(query['indexStudenta']);
    fs.readFile('prisustva.csv', 'utf8', function (err, data) {
        let informacije = {
            ime: "",
            prezime: "",
            index: "",
            prisustvoZaSedmicu: 0,
            prisutan: 0,
            odsutan: 0,
            nijeUneseno: 0
        };
        if (err) throw err;
        let redovi = data.split('\n');
        for (let i = 0; i < redovi.length; i++) {
            let red = redovi[i].split(',');
            if (red[2] == query['sedmica'] && red[3] == query['kodPredmeta'] && red[4] == query['indexStudenta']) {
                informacije['prisustvoZaSedmicu'] = red[2];
                informacije[red[5]]++;
            }
        }
        if (informacije['prisustvoZaSedmicu'] == 0 && informacije['prisutan'] == 0 && 
        informacije['odsutan'] == 0 && informacije['nijeUneseno'] == 0) {
                res.setHeader('content-type','application/json');
                res.status(409);
                res.send(JSON.stringify({status: 'Prisustvo ne postoji!'}));    
            }
            else {
                informacije['ime'] = studentInfo[0];
                informacije['prezime'] = studentInfo[1];
                informacije['index'] = studentInfo[2];
                res.setHeader('content-type','application/json');
                res.status(200);
                res.send(JSON.stringify(informacije));    
            }
    })
})

app.listen(8080);
module.exports = app;