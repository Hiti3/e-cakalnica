//za Cloud9...
if (!process.env.PORT)
  process.env.PORT = 8080;

//podatkovna baza
var sqlite3 = require('sqlite3').verbose();
var pb = new sqlite3.Database('cakalnaVrsta.sl3');



// Priprava strežnika
var express = require('express');
var expressSession = require('express-session');
var fs = require("fs");
var http = require("html");
var streznik = express();
streznik.set('view engine', 'ejs');
streznik.use(express.static('public'));
streznik.use(
  expressSession({
    secret: '1234567890QWERTY', 
    saveUninitialized: true,    
    resave: false,              
    cookie: {
      maxAge: 3600000       
    }
  })
);
//nastavi path
var path = require('path')

//prikazi index.html
streznik.get('/', function(zahteva, odgovor) {
    
    console.log("ping..");
    pb.all("SELECT * FROM potrjeneStranke", function(napaka, vrstice){
        if(napaka){
            console.log("Napaka baze");
        }else{
            console.log(vrstice);
            odgovor.render('seznam', {potrjeneStranke: vrstice});
        }
    })
    
    
    //odgovor.sendFile(path.join(__dirname, "views/index.html"));
    
})

//prikazi user.html
streznik.get('/user', function(zahteva, odgovor) {
    pb.all("SELECT * FROM potrjeneStranke", function(napaka, vrstice){
        if(napaka){
            console.log("Napaka baze");
        }else{
            console.log(vrstice);
            odgovor.render('user', {potrjeneStranke: vrstice});
        }
    })
})
//prikazi cakalnica.html
streznik.get('/cakalnica', function(zahteva, odgovor) {
   var stmt = pb.prepare("\
        INSERT INTO potrjeneStranke \
          (id, ime, priimek, timestamp ) \
        VALUES (?,?,?,?)");
      //TODO: add fields and finalize
      stmt.run("54", "aaaabdsadasa", "dsdsadasaodasd", new Date().getTime()); 
      stmt.finalize();
  
    pb.all("SELECT * FROM potrjeneStranke", function(napaka, vrstice){
        if(napaka){
            console.log("Napaka baze");
        }else{
            console.log(vrstice);
            odgovor.render('cakalnica', {potrjeneStranke: vrstice});
        }
    })
})
//prikazi usluzbenec.html
streznik.get('/usluzbenec', function(zahteva, odgovor) {
  pb.run("DELETE FROM potrjeneStranke WHERE id = 52");
   pb.all("SELECT * FROM potrjeneStranke", function(napaka, vrstice){
        if(napaka){
            console.log("Napaka baze");
        }else{
            console.log(vrstice);
            odgovor.render('usluzbenec', {potrjeneStranke: vrstice});
        }
    })
})

//Pozenemo streznik
streznik.listen(process.env.PORT, function() {
  console.log("Strežnik pognan!");
})
