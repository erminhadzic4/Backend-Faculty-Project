# Backend-Faculty-Project
A project for a Back-end Web Technology course, Faculty of Electrical Engineering, University of Sarajevo

A very refined back-end project, that lets admins of faculties store the information about the students like their name, surname, index. It has an option to add a subject with it's name and the code for a subject. Besides that, adding an attendance for a student is mandatory, so that is included as well.  

  | Route | Parameter |
  | :---: | :---: |
  | **POST /predmet** | {naziv:string,kod:string} |
  | **POST /student** | {ime:string,prezime:string,index:string} |
  | **POST /prisustvo** | {tipCasa:string,redniBrojCasa:integer,sedmica:integer,kodPredmeta:string,indexStudenta:string,statusPrisustva:string} |
  | **GET /prisustvo** | /prisustvo?kodPredmeta=kodPredmetaValue&indexStudenta=indexValue&sedmica=sedmicaValue |
  
Dependecies are in the files `package.json` and `package-lock.json`.
Various libraries were used like: Mocha, Chai, Express, Sequelize, BodyParser, etc... Before starting the `server.js` you need to make a database and change the literal `"test"` in `baza.js`. After that you need to run `napravi_tabele.js` only one time, to create the tables. 
Because force mode is enabled, running the `napravi_tabele.js` multiple times will override the tables, deleting the data completely and remaking the tables. After making the tables, run the `server.js` and now you are able to access the files using `http://localhost:8080/UnosPrisustva.html` for an example.
Default port is `8080` but you can change that as well.

Besides that, there is a folder called `backport` and inside of it is a backported version of the project which uses CSV files rather than a database to store all the data. The tests in mocha are written there as well and you can run them by using `mocha test2.js` for an example. Both of the versions are using `Ajax` and `static serving` so that everything needs to be done on server side.
Other than that, everything is the same between two versions including the parameters and the routes. Success and failures are visualized with green and red pop-ups. You can turn them off via buttons `"ISKLJUCI ALERTE"` or `"UKLJUCI ALERTE"`.  

#
# Screenshots of how the website looks

<img src="https://user-images.githubusercontent.com/101973117/218997285-033520b4-bcd8-4633-8db6-529e66e17bd2.PNG" width="900">
<img src="https://user-images.githubusercontent.com/101973117/218997291-8948174a-3709-42a1-8a94-04ad37414396.PNG" width="900">
<img src="https://user-images.githubusercontent.com/101973117/218997293-78657ba8-e498-4314-b80f-606755fd0b9f.PNG" width="900">
<img src="https://user-images.githubusercontent.com/101973117/218997296-4f4a22d6-ef5c-4931-92b2-3002bbca6d6a.PNG" width="1200">
<img src="https://user-images.githubusercontent.com/101973117/218999931-062f1b15-7a84-4a48-aaeb-84c93894884e.PNG" width="900">
<img src="https://user-images.githubusercontent.com/101973117/219000116-8aceea01-e668-49c9-a6b6-d9ae33073a1d.PNG" width="900">
