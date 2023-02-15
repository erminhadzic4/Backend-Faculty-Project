let server = require('./server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('testiranje metode POST na rutu /student', () => {
    let student = {
        ime: "test1",
        prezime: "test1",
        index: "1"
    }
    
    before((done) => {
        let fs = require('fs');
        fs.writeFile('studenti.csv', student['ime'] + ',' + student['prezime'] + ',' + student['index'] + '\n', ()  => {});
        done();
    });
    after((done) => {
        let fs = require('fs');
        fs.writeFile('studenti.csv', '', () => {});
        delete require.cache[require.resolve('fs')];
        done();
    });

    it('POST /student ce vratiti objekat da index vec postoji', (done) => {

        chai.request(server)
            .post('/student')
            .set('content-type', 'application/json')
            .send(student)
            .end((err, res) => {
                res.type.should.be.eql('application/json');
                res.body.should.be.eql({status: 'Student sa indexom ' + student['index'] + ' vec postoji!'});
                res.should.have.status(409); 
                should.not.exist(err); 
                done();
            });
    });

    it('POST /student ce vratiti objekat o uspjesnom kreiranju', (done) => {
        let student = {
            ime: "test2",
            prezime: "test2",
            index: "2"
        }

        chai.request(server)
            .post('/student')
            .set('content-type', 'application/json')
            .send(student)
            .end((err, res) => {
                res.type.should.be.eql('application/json');
                res.body.should.be.eql({status: 'Kreiran student!'});
                res.should.have.status(200);
                should.not.exist(err);
                done();
            });
    });
});

describe('testiranje metode POST na rutu /predmet', () => {
    let predmet = {
        naziv: 'TESTNI PREDMET',
        kod: 'RI-BoE-1-2'
    }
    
    before((done) => {
        let fs = require('fs');
        fs.writeFile('predmeti.csv', predmet['naziv'] + ',' + predmet['kod'] + '\n', ()  => {});
        done();
    });

    after((done) => {
        let fs = require('fs');
        fs.writeFile('predmeti.csv', '', () => {});
        delete require.cache[require.resolve('fs')];
        done();
    });

    it('POST /predmet ce vratiti objekat da kod vec postoji', (done) => {
        chai.request(server)
            .post('/predmet')
            .set('content-type', 'application/json')
            .send({naziv: 'Tehnike Programiranja', kod: 'RI-BoE-1-2'})
            .end((err, res) => {
                res.type.should.be.eql('application/json');
                res.body.should.be.eql({status: 'Predmet sa kodom ' + predmet['kod'] + ' vec postoji!'});
                res.should.have.status(409); 
                should.not.exist(err); 
                done();
            });
    });

    it('POST /predmet ce vratiti objekat da je kod neispravan', (done) => {
        let pogresan_kod_predmet = {
            naziv: 'Logicki dizajn',
            kod: 'RI-RS-3-1'
        }
        chai.request(server)
            .post('/predmet')
            .set('content-type', 'application/json')
            .send(pogresan_kod_predmet)
            .end((err, res) => {
                res.type.should.be.eql('application/json');
                res.body.should.be.eql({status: 'Kod predmeta nije ispravan!'});
                res.should.have.status(409); 
                should.not.exist(err); 
                done();
            });
    });

    it('POST /predmet ce vratiti objekat o uspjesnom kreiranju', (done) => {
        let predmet = {
            naziv: 'Napredni Razvoj Softvera',
            kod: 'RI-RS-2-2'
        }
        chai.request(server)
            .post('/predmet')
            .set('content-type', 'application/json')
            .send(predmet)
            .end((err, res) => {
                res.type.should.be.eql('application/json');
                res.body.should.be.eql({status: 'Kreiran predmet!'});
                res.should.have.status(200); 
                should.not.exist(err); 
                done();
            });
    });
});
