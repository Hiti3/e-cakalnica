//za Cloud9...
if (!process.env.PORT)
  process.env.PORT = 8080;

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
    odgovor.sendFile(path.join(__dirname, "views/index.html"));
})

//prikazi user.html
streznik.get('/user', function(zahteva, odgovor) {
    console.log("ping..");
    odgovor.sendFile(path.join(__dirname, "views/user.html"));
})
//prikazi cakalnica.html
streznik.get('/cakalnica', function(zahteva, odgovor) {
    console.log("ping..");
    odgovor.sendFile(path.join(__dirname, "views/cakalnica.html"));
})
//prikazi usluzbenec.html
streznik.get('/usluzbenec', function(zahteva, odgovor) {
    console.log("ping");
    odgovor.sendFile(path.join(__dirname, "views/usluzbenec.html"));
})

//Pozenemo streznik
streznik.listen(process.env.PORT, function() {
  console.log("Strežnik pognan!");
})
