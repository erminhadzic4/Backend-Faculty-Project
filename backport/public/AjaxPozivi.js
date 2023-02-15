let UKLJUCENI_ALERTI = true;

function update_alerta() {
    if (UKLJUCENI_ALERTI) {
        document.getElementsByClassName('update_alerta')[0].innerHTML = "UKLJUCI ALERTE";
        UKLJUCENI_ALERTI = false;
        console.log("Alerti su iskljuceni!");
    }
    else {
        document.getElementsByClassName('update_alerta')[0].innerHTML = "ISKLJUCI ALERTE";
        UKLJUCENI_ALERTI = true;
        console.log("Alerti su ukljuceni!");
    }
}

function dodajCss(element, css) {
    element.appendChild(document.createElement("style")).innerHTML=css;
}

function pozovi_posaljiPredmet() {
    posaljiPredmet(({naziv: document.getElementById('naziv').value, kod: document.getElementById('kod').value}), test);
}

function pozovi_posaljiStudent() {
    posaljiStudent(({ime: document.getElementById('ime').value, prezime: document.getElementById('prezime').value, index: document.getElementById('index').value}), test);
}

function pozovi_posaljiPrisustvo() {
    posaljiPrisustvo(({tipCasa: document.getElementById('tipCasa').value, redniBrojCasa: document.getElementById('redniBrojCasa').value, 
                       sedmica: document.getElementById('sedmica').value, kodPredmeta: document.getElementById('kodPredmeta').value, 
                       indexStudenta: document.getElementById('indexStudenta').value, statusPrisustva: document.getElementById('statusPrisustva').value}), test);
}

function pozovi_dajPrisustvo() {
    dajPrisustvo(document.getElementById('kod').value, document.getElementById('index').value, 
                 document.getElementById('sedmica').value, test);
}

function posaljiStudent(studentObjekat, callback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        let obj = {
            status: "",
            title: "",
            content: ""
        }
        if (ajax.readyState == 4 && ajax.status == 200){
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'success';
                obj['title'] = 'Uspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback("Uspjesno", ajax.responseText);
        }
        else if (ajax.readyState == 4) {
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'error';
                obj['title'] = 'Neuspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback(ajax.responseText, null);
        }
    }
    ajax.open("POST","http://localhost:8080/student",true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("ime=" + studentObjekat['ime'] + "&prezime=" + studentObjekat['prezime'] + "&index=" + studentObjekat['index']);
}

function posaljiPredmet(predmetObjekat, callback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        let obj = {
            status: "",
            title: "",
            content: ""
        }
        if (ajax.readyState == 4 && ajax.status == 200){
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'success';
                obj['title'] = 'Uspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback("Uspjesno", ajax.responseText);
        }
        else if (ajax.readyState == 4) {
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'error';
                obj['title'] = 'Neuspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback(ajax.responseText, null);
        }
    }
    ajax.open("POST","http://localhost:8080/predmet",true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("naziv=" + predmetObjekat['naziv'] + "&kod=" + predmetObjekat['kod']);
}

function posaljiPrisustvo(prisustvoObjekat, callback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        let obj = {
            status: "",
            title: "",
            content: ""
        }
        if (ajax.readyState == 4 && ajax.status == 200){
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'success';
                obj['title'] = 'Uspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback("Uspjesno", ajax.responseText);
        }
        else if (ajax.readyState == 4) {
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'error';
                obj['title'] = 'Neuspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback(ajax.responseText, null);
        }
    }
    ajax.open("POST","http://localhost:8080/prisustvo",true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("tipCasa=" + prisustvoObjekat['tipCasa'] + "&redniBrojCasa=" + prisustvoObjekat['redniBrojCasa'] + "&sedmica=" + prisustvoObjekat['sedmica'] + 
         "&kodPredmeta=" + prisustvoObjekat['kodPredmeta'] + "&indexStudenta=" + prisustvoObjekat['indexStudenta'] + "&statusPrisustva=" + prisustvoObjekat['statusPrisustva']);
}

function dajPrisustvo(kodPredmeta, indexStudenta, sedmica, callback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        let obj = {
            status: "",
            title: "",
            content: ""
        }
        if (ajax.readyState == 4 && ajax.status == 200){

            var forma = document.getElementsByClassName('login-box')[0];
            dodajCss(forma, ".login-box { position: relative; }");
            dodajCss(forma, ".login-box { animation: pomjeri 10s; }");
            dodajCss(forma, ".login-box { animation-direction: normal; }");
            dodajCss(forma, ".login-box {-webkit-animation-fill-mode: forwards;}");
            dodajCss(forma, ".login-box {animation-fill-mode: forwards;}");
            
            let JSON_odgovor = JSON.parse(ajax.responseText)
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'success';
                obj['title'] = 'Uspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            const niz = ["ime", "prezime", "index", "prisustvoZaSedmicu", "prisutan", "odsutan", "nijeUneseno"];
            var tabela = document.getElementsByClassName("tabela")[0];
            dodajCss(tabela, "table.tabela { animation: 1s fade; }");
            dodajCss(tabela, "table.tabela { animation-fill-mode: forwards; }");
            dodajCss(tabela, "table.tabela { display: inline; }");
            var redovi = tabela.getElementsByTagName("tr");
            var informacije = []; 

            for (var i = 0; i < niz.length; i++) 
                informacije.push(JSON_odgovor[niz[i]]);

            for (var i=0; i<redovi.length; i++)
                redovi[i].getElementsByTagName("td")[0].innerHTML = informacije[i];

            callback("Uspjesno", ajax.responseText);
        }
        else if (ajax.readyState == 4) {
            if (UKLJUCENI_ALERTI) {
                obj['status'] = 'error';
                obj['title'] = 'Neuspjesno dodavanje';
                obj['content'] = ajax.responseText;
                New.alert(obj);
            }
            callback(ajax.responseText, null);
        }
    } 
    ajax.open("GET","http://localhost:8080/prisustvo?kodPredmeta=" + kodPredmeta + "&indexStudenta=" + indexStudenta + "&sedmica=" + sedmica,true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send();
}

 function test(err, data) {
    console.log(err + "," + data);
 }
