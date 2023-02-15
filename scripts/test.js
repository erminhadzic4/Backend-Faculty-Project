//Ovu funkciju sam napisao cisto kako bi mi generisala potreban tekst greske za ispis na stranici, kako bi kod bio citljiviji
function ispisGreske(indeksSedmice, prSedmica, prisutan, odsutan, nijeUneseno) {
  let greske = "";
  if (!prSedmica) greske += "prSedmica";
  if (!prisutan) 
      if (greske.length > 0) greske += ", prisutan";
      else greske += "prisutan";
  if(!odsutan)
      if (greske.length > 0) greske += ", odsutan";
      else greske += "odsutan";
  if (!nijeUneseno)
      if (greske.length > 0) greske += ", nijeUneseno";
      else greske += "nijeUneseno";
  return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + indeksSedmice + " za properties [" + greske + "]!"};
}

let assert = chai.assert;
describe('Funkcija: izracunajPrisustvo', function() {
 describe('#parametar sedmica', function() {

   it('treba vratiti GRESKA_PARAM_SEDMICA_CIJELI kada sedmica nije u opsegu [1,15]', function() {
       const test = new Prisustvo;
       test.trenutnaSedmica = 7; 
       const ulaz = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
       assert.equal(test.izracunajPrisustvo(16, ulaz), GRESKA_PARAM_SEDMICA_CIJELI);
   });

   it('treba vratiti GRESKA_PARAM_SEDMICA_RASPON kada sedmica nije manja ili jednaka atributu trenutnaSedmica', function() {
       const test = new Prisustvo;
       test.trenutnaSedmica = 7; 
       const ulaz = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
       assert.equal(test.izracunajPrisustvo(10, ulaz), GRESKA_PARAM_SEDMICA_RASPON);
   });

 });
 describe('#parametar listaPrisustva', function() { 
    describe('- testiranje jednog nevalidnog objekta u nizu objekata', function() {

        it('treba vratiti ' + JSON.stringify(ispisGreske(1, true, false, true, true)), function() {
            const test = new Prisustvo;
            test.trenutnaSedmica = 7; 
            const ulaz = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: 2, nijeUneseno: 1 }];
            assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(1, true, false, true, true)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(5, true, true, false, true)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 5, prisutan: 2, odsutan: -100, nijeUneseno: 1 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(5, true, true, false, true)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(3, true, true, true, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 2, odsutan: 2, nijeUneseno: 9 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(3, true, true, true, false)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(6, true, false, false, true)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 6, prisutan: 400, odsutan: 500, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(6, true, false, false, true)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(2, true, false, true, false)), function() { 
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 2, prisutan: 9, odsutan: 2, nijeUneseno: -1 }, { prSedmica: 4, prisutan: 2, odsutan: 3, nijeUneseno: 1 }, { prSedmica: 7, prisutan: 5, odsutan: 4, nijeUneseno: 6 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(2, true, false, true, false)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(7, true, true, false, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 7, prisutan: 3, odsutan: 9, nijeUneseno: -100 }, { prSedmica: 5, prisutan: 1, odsutan: 5, nijeUneseno: 6 }, { prSedmica: 3, prisutan: 4, odsutan: 4, nijeUneseno: 3 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(7, true, true, false, false)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(2, true, false, false, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 2, prisutan: -3, odsutan: -9, nijeUneseno: -100 }, { prSedmica: 5, prisutan: 1, odsutan: 5, nijeUneseno: 6 }, { prSedmica: 3, prisutan: 4, odsutan: 4, nijeUneseno: 3 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(2, true, false, false, false)));
        });

    });
    describe('- testiranje više nevalidnih objekata u nizu objekata', function() {

        it('treba vratiti ' + JSON.stringify(ispisGreske(1, false, false, true, true)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 1, prisutan: -1, odsutan: 2, nijeUneseno: 3 }, { prSedmica: 2, prisutan: -2, odsutan: 3, nijeUneseno: 3 }, { prSedmica: 6, prisutan: 1, odsutan: 0, nijeUneseno: 5 }];;
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(1, false, false, true, true)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(1, false, true, false, true)), function() { 
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 3, prisutan: 3, odsutan: 2, nijeUneseno: 3 }, { prSedmica: 1, prisutan: 2, odsutan: -3, nijeUneseno: 1 }, { prSedmica: 7, prisutan: -5, odsutan: 4, nijeUneseno: 6 }];
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(1, false, true, false, true)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(3, false, true, true, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 4, prisutan: 5, odsutan: 2, nijeUneseno: 3 }, { prSedmica: 3, prisutan: 7, odsutan: 3, nijeUneseno: 19 }, { prSedmica: 2, prisutan: 1, odsutan: -1, nijeUneseno: 5 }];;
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(3, false, true, true, false)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(6, false, false, false, true)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 1, prisutan: 4, odsutan: 6, nijeUneseno: 4 }, { prSedmica: 6, prisutan: -2, odsutan: -1, nijeUneseno: 3 }, { prSedmica: 1, prisutan: -10, odsutan: -19, nijeUneseno: 50 }];;
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(6, false, false, false, true)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(5, false, false, true, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 5, prisutan: -1, odsutan: 6, nijeUneseno: -10 }, { prSedmica: 4, prisutan: -2, odsutan: -1, nijeUneseno: 3 }, { prSedmica: 3, prisutan: -10, odsutan: -19, nijeUneseno: 50 }];;
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(5, false, false, true, false)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(1, false, true, false, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 1, prisutan: 1, odsutan: -6, nijeUneseno: -1 }, { prSedmica: 4, prisutan: -2, odsutan: -1, nijeUneseno: 3 }, { prSedmica: 3, prisutan: -5, odsutan: 5, nijeUneseno: 3 }];;
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(1, false, true, false, false)));
        });

        it('treba vratiti ' + JSON.stringify(ispisGreske(4, false, false, false, false)), function() {
          const test = new Prisustvo;
          test.trenutnaSedmica = 7; 
          const ulaz = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 4, prisutan: -2, odsutan: -2, nijeUneseno: -1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];;
          assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(ispisGreske(4, false, false, false, false)));
        });

    });
    describe('- testiranje zbira properties', function() {

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_SUMARNO), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 2, prisutan: 3, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 5, odsutan: 4, nijeUneseno: 4 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(1, ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_SUMARNO));
      });

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_SUMARNO), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 6, prisutan: 3, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 5, prisutan: 1, odsutan: 5, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 4, odsutan: 4, nijeUneseno: 3 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(4, ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_SUMARNO));
      });

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_SUMARNO), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 1, prisutan: 2, odsutan: 3, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 3, prisutan: 4, odsutan: 4, nijeUneseno: 1 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_SUMARNO));
      });

    });


    });

    describe('#testiranje neispravnosti oba parametra', function() {

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_SEDMICA_RASPON), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 401000, prisutan: -3, odsutan: 100, nijeUneseno: 101 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 5, odsutan: 4, nijeUneseno: 4 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(10, ulaz)), JSON.stringify(GRESKA_PARAM_SEDMICA_RASPON));
      });

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_SEDMICA_RASPON), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 2, prisutan: 7, odsutan: 7, nijeUneseno: 7 }, { prSedmica: 3, prisutan: 4, odsutan: 1, nijeUneseno: 3 }, { prSedmica: 2, prisutan: 3, odsutan: 1, nijeUneseno: 5 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(14, ulaz)), JSON.stringify(GRESKA_PARAM_SEDMICA_RASPON));
      });

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_SEDMICA_CIJELI), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 11, prisutan: -1, odsutan: 15, nijeUneseno: -1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 5, odsutan: 4, nijeUneseno: 4 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(16, ulaz)), JSON.stringify(GRESKA_PARAM_SEDMICA_CIJELI  ));
      });

      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_SEDMICA_CIJELI), function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 4, prisutan: 7, odsutan: 0, nijeUneseno: 0 }, { prSedmica: 2, prisutan: 3, odsutan: 7, nijeUneseno: 14 }, { prSedmica: 2, prisutan: 3, odsutan: 1, nijeUneseno: 5 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(-110, ulaz)), JSON.stringify(GRESKA_PARAM_SEDMICA_CIJELI));
      });
  });
  
  describe('#testiranje ispravnosti oba parametra', function() {

    it('treba vratiti ' + JSON.stringify({ prisustvoZaSedmicu: 2, prisutan: 2, odsutan: 2, nijeUneseno: 1 }), function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 1, prisutan: 3, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 5, odsutan: 1, nijeUneseno: 1 }];
      assert.equal(JSON.stringify(test.izracunajPrisustvo(2, ulaz)), JSON.stringify({ prisustvoZaSedmicu: 2, prisutan: 2, odsutan: 2, nijeUneseno: 1 }));
    });
    
    it('treba vratiti ' + JSON.stringify({ prisustvoZaSedmicu: 1, prisutan: 2, odsutan: 3, nijeUneseno: 3 }), function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 1, prisutan: 3, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 1, odsutan: 1, nijeUneseno: 6 }, { prSedmica: 1, prisutan: 2, odsutan: 3, nijeUneseno: 3 }];
      assert.equal(JSON.stringify(test.izracunajPrisustvo(1, ulaz)), JSON.stringify({ prisustvoZaSedmicu: 1, prisutan: 2, odsutan: 3, nijeUneseno: 3 }));
    });

    it('treba vratiti ' + JSON.stringify({ prisustvoZaSedmicu: 5, prisutan: 2, odsutan: 2, nijeUneseno: 2 }), function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 1, prisutan: 2, odsutan: 3, nijeUneseno: 3 }, { prSedmica: 5, prisutan: 2, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 6, prisutan: 1, odsutan: 5, nijeUneseno: 1 }];
      assert.equal(JSON.stringify(test.izracunajPrisustvo(5, ulaz)), JSON.stringify({ prisustvoZaSedmicu: 5, prisutan: 2, odsutan: 2, nijeUneseno: 2 }));
    });

    it('treba vratiti ' + JSON.stringify({ prisustvoZaSedmicu: 5, prisutan: 1, odsutan: 1, nijeUneseno: 6 }), function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 5, prisutan: 4, odsutan: 1, nijeUneseno: 2 }, { prSedmica: 5, prisutan: 1, odsutan: 1, nijeUneseno: 6 }, { prSedmica: 3, prisutan: 3, odsutan: 1, nijeUneseno: 2 }];
      assert.equal(JSON.stringify(test.izracunajPrisustvo(5, ulaz)), JSON.stringify({ prisustvoZaSedmicu: 5, prisutan: 1, odsutan: 1, nijeUneseno: 6 }));
    });
  });

  describe('#testiranje ispravnog racuna za atribut prisustvo', function() {

    it('treba vratiti ' + 10/(7+10), function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 1, prisutan: 3, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 5, odsutan: 1, nijeUneseno: 1 }];
      test.izracunajPrisustvo(1, ulaz);
      assert.equal(test.prisustvo,10/(7+10));
    });

    it('treba vratiti ' + 5/(5+7), function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 6 }, { prSedmica: 7, prisutan: 3, odsutan: 3, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 1, odsutan: 3, nijeUneseno: 4 }];
      test.izracunajPrisustvo(7, ulaz);
      assert.equal(test.prisustvo,5/(5+7));
    });

    it('treba vratiti ' + 13/(13+8) , function() {
      const test = new Prisustvo;
      test.trenutnaSedmica = 7; 
      const ulaz = [{ prSedmica: 1, prisutan: 4, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 3, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 6, odsutan: 2, nijeUneseno: 0 }];
      test.izracunajPrisustvo(7, ulaz);
      assert.equal(test.prisustvo,13/(13+8));
    });

  });

  describe('#testiranje unikatnih slucajeva', function() {

    describe('-prazan niz objekata', function() {
      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_PRAZNA) , function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(7,ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_PRAZNA));
      });
    });

    describe('-visak objekata', function() {
      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_VISAK_ATRIBUTA) , function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 1, prisutan: 4, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 3, odsutan: 4, nijeUneseno: 1, datum_unosa: 12/4/2021 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(7,ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_VISAK_ATRIBUTA));
      });
    });

    describe('-unesen char umjesto int', function() {
      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_POGRESAN_TIP) , function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 1, prisutan: 's', odsutan: 2, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 3, odsutan: 4, nijeUneseno: 1 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(7,ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_POGRESAN_TIP));
      });
    });

    describe('-sedmica ne postoji u nizu', function() {
      it('treba vratiti ' + JSON.stringify({ prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1 }) , function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 1, prisutan: 3, odsutan: 1, nijeUneseno: 3 }, { prSedmica: 4, prisutan: 1, odsutan: 1, nijeUneseno: 6 }, { prSedmica: 2, prisutan: 3, odsutan: 3, nijeUneseno: 1 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(5,ulaz)), JSON.stringify({ prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1 }));
      });
    });

    describe('-fali jedan property', function() {
      it('treba vratiti ' + JSON.stringify(GRESKA_PARAM_LISTA_PROPERTIES) , function() {
        const test = new Prisustvo;
        test.trenutnaSedmica = 7; 
        const ulaz = [{ prSedmica: 1, prisutan: 3, odsutan: 1 }, { prSedmica: 4, prisutan: 1, odsutan: 1, nijeUneseno: 6 }, { prSedmica: 2, prisutan: 3, odsutan: 3, nijeUneseno: 1 }];
        assert.equal(JSON.stringify(test.izracunajPrisustvo(5,ulaz)), JSON.stringify(GRESKA_PARAM_LISTA_PROPERTIES));
      });
    });

  });

});