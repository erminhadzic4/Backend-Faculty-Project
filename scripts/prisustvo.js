const GRESKA_PARAM_SEDMICA_CIJELI = {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"};
const GRESKA_PARAM_SEDMICA_RASPON = {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"};
const GRESKA_PARAM_LISTA_PROPERTIES = {greska: "Parametar listaPrisustva nema ispravne properties!"};
const GRESKA_PARAM_LISTA_SUMARNO = {greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"};
const GRESKA_PARAM_LISTA_PRAZNA = {greska: "Parametar listaPrisustva je prazna!"};
const GRESKA_PARAM_LISTA_VISAK_ATRIBUTA = {greska: "Parametar listaPrisustva ima viska atributa!"};
const GRESKA_PARAM_LISTA_POGRESAN_TIP = {greska: "Parametar listaPrisutva i sedmica primaju samo cijele brojeve!"};

class Prisustvo {
    static trenutnaSedmica;
    prisustvo;
    finalnoStanje;
    constructor() {
        this.finalnoStanje = false;
        this.trenutnaSedmica = 1;
        this.prisustvo = 0;
    }
    validiraj(prisustvo) {
        let greske = "";
        if (!("prSedmica" in prisustvo) || !("prisutan" in prisustvo) || 
                !("odsutan" in prisustvo) || !("nijeUneseno" in prisustvo)) 
                    return -404;
        if (!Number.isInteger(prisustvo['prSedmica']) || !Number.isInteger(prisustvo['prisutan']) || 
            !Number.isInteger(prisustvo['odsutan']) || !Number.isInteger(prisustvo['nijeUneseno']))
                return -405;
        if (prisustvo['prSedmica'] < 1 || prisustvo['prSedmica'] > 15)
            greske += "prSedmica";
        if (prisustvo['prisutan'] < 0 || prisustvo['prisutan'] > 8)
            if (greske.length > 0) greske += ", prisutan";
                else greske += "prisutan"; 
        if (prisustvo['odsutan'] < 0 || prisustvo['odsutan'] > 8)
            if (greske.length > 0) greske += ", odsutan";
                else greske += "odsutan"; 
        if (prisustvo['nijeUneseno'] < 0 || prisustvo['nijeUneseno'] > 8)
            if (greske.length > 0) greske += ", nijeUneseno";
                else greske += "nijeUneseno"; 
        if (greske.length > 0) return greske;
        return 1;
    }
    izracunajPrisustvo(sedmica, listaPrisustva) {

        if (!Number.isInteger(sedmica) || sedmica > 15 || sedmica < 1) return GRESKA_PARAM_SEDMICA_CIJELI;
        if (sedmica > this.trenutnaSedmica) return GRESKA_PARAM_SEDMICA_RASPON;

        let greske = "";
        let brojSedmice;
        let brojac = 0;

        if (listaPrisustva.length === 0)
            return GRESKA_PARAM_LISTA_PRAZNA;

        if (listaPrisustva.length === 1) {
            let odgovor = this.validiraj(listaPrisustva[0]);
            if (odgovor === -404) 
                return GRESKA_PARAM_LISTA_PROPERTIES;
            if (odgovor === -405)
                return GRESKA_PARAM_LISTA_POGRESAN_TIP;
            greske = odgovor;
            brojSedmice = listaPrisustva[0]['prSedmica'];
            if (odgovor !== 1)
                return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + brojSedmice + " za properties [" + greske + "]!"};
            if (listaPrisustva[0]['prisutan'] + listaPrisustva[0]['odsutan'] + listaPrisustva[0]['nijeUneseno'] > 8)
                return GRESKA_PARAM_LISTA_SUMARNO;
            return 1; 
        }

        for (let i = 0; i < listaPrisustva.length; i++) 
            if (Object.keys(listaPrisustva[i]).length > 4) 
                return GRESKA_PARAM_LISTA_VISAK_ATRIBUTA;

        for (let i = 0; i < listaPrisustva.length; i++) 
            for (let j = listaPrisustva.length-1; j > i; j--) 
                if (listaPrisustva[i]['prSedmica'] === listaPrisustva[j]['prSedmica'])
                    listaPrisustva.splice(i,1);

        for (let i = 0; i < listaPrisustva.length; i++)
            if (this.validiraj(listaPrisustva[i]) !== 1) 
                brojac++;
            
        if (!Number.isInteger(sedmica) || sedmica > 15 || sedmica < 1) return GRESKA_PARAM_SEDMICA_CIJELI;
        if (sedmica > this.trenutnaSedmica) return GRESKA_PARAM_SEDMICA_RASPON;

        for (let i = 0; i < listaPrisustva.length; i++) {
            let odgovor = this.validiraj(listaPrisustva[i]);
            if (odgovor !== 1) {
                greske = odgovor;
                if (greske === -404)
                    return GRESKA_PARAM_LISTA_PROPERTIES;
                if (odgovor === -405)
                    return GRESKA_PARAM_LISTA_POGRESAN_TIP;
                brojSedmice = listaPrisustva[i]['prSedmica'];
                if (brojac > 1) return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + brojSedmice + " za properties [prSedmica, " + greske + "]!"};
                else return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + brojSedmice + " za properties [" + greske + "]!"};
            }
        }
        
        for (let i = 0; i < listaPrisustva.length; i++) 
            if (listaPrisustva[i]['prisutan'] +  listaPrisustva[i]['odsutan'] + listaPrisustva[i]['nijeUneseno'] > 8)
                return GRESKA_PARAM_LISTA_SUMARNO;

        //ako je compiler dosao do ove linije, znaci da nema gresaka

        let ukupno_prisutan = 0, ukupno_odsutan = 0;

        for (let i = 0; i < listaPrisustva.length; i++) {
            ukupno_prisutan+=listaPrisustva[i]['prisutan'];
            ukupno_odsutan+=listaPrisustva[i]['odsutan'];
        }

        this.prisustvo = ukupno_prisutan/(ukupno_prisutan+ukupno_odsutan);

        if (listaPrisustva.every((currentValue) => currentValue['nijeUneseno'] === 0)) 
            this.finalnoStanje = true;

        let objekat = listaPrisustva.find(x => x.prSedmica === sedmica);
        if (objekat === undefined)
            return {prisustvoZaSedmicu: sedmica, prisutan: -1, odsutan: -1, nijeUneseno: -1};
        return {prisustvoZaSedmicu: sedmica, prisutan: objekat.prisutan, odsutan: objekat.odsutan, nijeUneseno: objekat.nijeUneseno};
    }
}