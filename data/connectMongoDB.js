"use strict" //Per obtenir compatibilitat amb les ultimes versions

var mongoose= require("mongoose");

const config = require("../config/config");
const app = require("../app");


mongoose.connect("mongodb://localhost:27017/curs_nodejs",(err, res) =>{
if(err){
throw err;
}else{
  console.log("La base de dades está funcionant correctament");
  app.listen(config.port, () => {
    console.log("Exemple d'app escoltant");
  })
}
});

