"use strict" //Per obtenir compatibilitat amb les ultimes versions

//const express = require("express");
//const http = require('http');
var mongoose= require("mongoose");
//const app = express();
const app = require("../app");
const port = 3000;


mongoose.connect("mongodb://localhost:27017/curs_nodejs",(err, res) =>{
if(err){
throw err;
}else{
  console.log("La base de dades está funcionant correctamente");
  app.listen(port, () => {
    console.log("Exemple d'app escoltant");
  })
}
});

