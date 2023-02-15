const odsjeci = ["AE", "TK", "EE", "RI"];
const ciklusi = ["RS", "MoE", "BoE"];

class Predmet {
    kodPredmeta;
    provjeriKodPredmeta(kodPredmeta) {
        let odsjek, ciklus, godina, semestar;
        kodPredmeta = kodPredmeta.replace(/\s/g, '');
        if (kodPredmeta.length > 10 || kodPredmeta.length < 9)
            return false;
        if (odsjeci.indexOf(kodPredmeta[0] + kodPredmeta[1]) !== -1){
            odsjek = kodPredmeta[0] + kodPredmeta[1];
            if (kodPredmeta[2] !== "-") 
                return false;

            if (kodPredmeta.length === 9) {
                if (ciklusi.indexOf(kodPredmeta[3] + kodPredmeta[4]) !== -1) 
                    ciklus = kodPredmeta[3] + kodPredmeta[4];
                else return false;
            }

            else if (kodPredmeta.length === 10) {
                if (ciklusi.indexOf(kodPredmeta[3] + kodPredmeta[4] + kodPredmeta[5]) !== -1) 
                    ciklus = kodPredmeta[3] + kodPredmeta[4] + kodPredmeta[5];
                else return false;
            }

            if (ciklus === "RS") {
                if (kodPredmeta[5] !== "-") 
                    return false;
                if (kodPredmeta[6] === "1")
                    godina = 1;
                else if (kodPredmeta[6] === "2") 
                    godina = 2;
                else return false;
                if (kodPredmeta[7] !== "-")
                    return false;
                if (kodPredmeta[8] === "1")
                    semestar = 1;
                else if (kodPredmeta[8] === "2")
                    semestar = 2;
                else return false;
            }

            if (ciklus === "MoE") {
                if (kodPredmeta[6] !== "-") 
                    return false;
                if (kodPredmeta[7] === "1")
                    godina = 1;
                else if (kodPredmeta[7] === "2") 
                    godina = 2;
                else return false;
                if (kodPredmeta[8] !== "-")
                    return false;
                if (kodPredmeta[9] === "1")
                    semestar = 1;
                else if (kodPredmeta[9] === "2")
                    semestar = 2;
                else return false;
            }

            if  (ciklus === "BoE") {
                if (kodPredmeta[6] !== "-") 
                    return false;
                if (kodPredmeta[7] === "1")
                    godina = 1;
                else if (kodPredmeta[7] === "2") 
                    godina = 2;
                else if (kodPredmeta[7] === "3")
                    godina = 3;
                else return false;
                if (kodPredmeta[8] !== "-")
                    return false;
                if (kodPredmeta[9] === "1")
                    semestar = 1;
                else if (kodPredmeta[9] === "2")
                    semestar = 2;
                else return false;
            }
        }         
        else return false;   
        this.kodPredmeta = odsjek+"-"+ciklus+"-"+semestar+"-"+godina;
        return true;
    }
};

module.exports = Predmet;
