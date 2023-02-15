const Predmet = require('./scripts/predmet');
const db = require('./baza.js');
const bodyParser = require("body-parser");
const express = require("express");
const { StudentPredmet } = require('./baza.js');
const app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.sendFile(__dirname+"/public/unosPredmeta.html");
});

app.post('/student', async (req, res) => {
    const { ime, prezime, index } = req.body;
    const postoji = await db.Student.findOne({ where: { index } });
   if (req.body['ime'] == "" || req.body['prezime'] == "" || req.body['index'] == "") {
                res.setHeader('content-type','application/json');
                res.status(409);
                res.send(JSON.stringify({status: 'Nepotpune informacije!'}));
                return;
    }
    else if (postoji) {
        res.status(409);
        res.send(JSON.stringify({ status: `Student sa indexom ${index} vec postoji!` }));
    } else {
        await db.Student.create({ ime, prezime, index });
        res.status(200);
        res.send(JSON.stringify({ status: `Kreiran student` }));
    }
});

app.post('/predmet', async (req, res) => {
    const { naziv, kod } = req.body
    const postoji = await db.Predmet.findOne({ where: { kod } });
    var provjera = new Predmet();
    res.setHeader('content-type','application/json');

    if (req.body['naziv'] == "" || req.body['kod'] == "") {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Nepotpune informacije!'}));
        return;
    } 

    else if (postoji) {
        res.status(409);
        res.send(JSON.stringify({ status: `Predmet sa kodom ${kod} vec postoji!` }));
    } else if (!provjera.provjeriKodPredmeta((req.body['kod']))) {
        res.status(409);
        res.send(JSON.stringify({status: 'Kod predmeta nije ispravan!'}));
        return;
    } else {
        await db.Predmet.create({ naziv, kod });
        res.status(200);
        res.send(JSON.stringify({ status: 'Kreiran predmet!' }));
    }
});

app.post('/prisustvo', async (req, res) => {
    let tip = req.body.tipCasa;
    let redniBroj = req.body.redniBrojCasa;
    let sedmica = req.body.sedmica;
    let kod = req.body.kodPredmeta;
    let index = req.body.indexStudenta;
    let status = req.body.statusPrisustva;
    var provjera = new Predmet();

    if (tip == "" || redniBroj == "" || sedmica == "" || 
        kod == "" || index == "" || status == "") {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Nepotpune informacije!' }));
        return;
    }

    else if (status != "prisutan" && status != "odsutan" && status != "nijeUneseno") {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Status prisustva nije ispravan!' }));
        return;
    }

    else if (!provjera.provjeriKodPredmeta(kod)) {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Kod predmeta nije ispravan!'}));
        return;
    }

    try {
    let predmet = await db.Predmet.findOne({ where: { kod: kod } });
        if (!predmet) {
            res.status(404).setHeader('content-type','application/json').send(JSON.stringify({ status: 'Kod predmeta ne postoji!' }));
            return;
        }

        let student = await db.Student.findOne({ where: { index: index } });
        if (!student) {
            res.status(404).setHeader('content-type','application/json').send(JSON.stringify({ status: 'Student ne postoji!' }));
            return;
        }
        
        let [cas, napravljeno] = await db.Cas.findOrCreate({ where: { tip: tip, redniBroj: redniBroj, sedmica: sedmica, predmetId: predmet.id }});

        let [prisustvo, novoPrisustvo] = await db.Prisustvo.findOrCreate({ where: { studentId: student.id, casId: cas.id },
            defaults: { status: status }
        });

        if (!novoPrisustvo) {
            await prisustvo.update({ status: status });
        }

        let [StudentPredmet, napravljeniStudentPredmet] = await db.StudentPredmet.findOrCreate({ where: { studentId: student.id, predmetId: predmet.id } });

        if (novoPrisustvo) 
            return res.status(200).setHeader('content-type','application/json').send(JSON.stringify({ status: 'Kreirano prisustvo!' })); 
        else 
            return res.status(200).setHeader('content-type','application/json').send(JSON.stringify({ status: 'Azurirano prisustvo' }));

    } catch (err) {
        console.log(err);
        return res.status(500).setHeader('content-type','application/json').send({ status: 'Greska sa serverom!' });
    }
});

app.get('/prisustvo', async (req, res) => {

    let kod = req.query.kodPredmeta;
    let index = req.query.indexStudenta;
    let sedmica = req.query.sedmica;

    if (kod == "" || index == "" || sedmica == "") {
        res.setHeader('content-type','application/json');
        res.status(409);
        res.send(JSON.stringify({status: 'Nepotpune informacije!'}));
        return;
    }

    try {
        
        let predmet = await db.Predmet.findOne({ where: { kod: kod } });
        let student = await db.Student.findOne({ where: { index: index } });
        
        if (!predmet) return res.status(404).setHeader('content-type','application/json').send({ status: 'Predmet ne postoji!' });
        if (!student) return res.status(404).setHeader('content-type','application/json').send({ status: 'Student ne postoji!' });

        let prisustvo = await db.Cas.findOne({ where: { sedmica: sedmica, predmetId: predmet.id },
            include: [{ model: db.Prisustvo, where: { studentId: student.id }}]});

        if (!prisustvo) return res.status(404).setHeader('content-type','application/json').send({ status: 'Prisustvo ne postoji!' });

        let casovi = await db.Cas.findAll({ where: { predmetId: predmet.id, sedmica: sedmica },
            include: [{ model: db.Prisustvo, where: { studentId: student.id }}]});

        let prisutan = 0;
        let odsutan = 0;
        let nijeUneseno = 0;
        casovi.forEach(cas => {
            if (cas.Prisustvos[0].status == "prisutan") 
                prisutan++;
            else if (cas.Prisustvos[0].status == "odsutan") 
                odsutan++;
            else nijeUneseno++;
        });

        return res.status(200).setHeader('content-type','application/json').send(JSON.stringify({
            ime: student.dataValues.ime,
            prezime: student.dataValues.prezime,
            index: student.dataValues.index,
            prisustvoZaSedmicu: sedmica,
            prisutan: prisutan,
            odsutan: odsutan,
            nijeUneseno: nijeUneseno
        }));
    } catch (err) {
        console.log(err);
        return res.status(500).setHeader('content-type','application/json').send({ status: 'Greska sa serverom!' });
    }
});

app.listen(8080);
module.exports = app;