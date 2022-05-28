'use strict' //per emprar expresions de js més modern

const mongoose = require("mongoose")
const Schema = mongoose.Schema; //Ens permetra el crear un objecte tipus schema de la bd i que posteriorment al guardar dades s'enmagatzamaran dins d'una coleccio concreta i alhora en un document.

let PlayerSchema = Schema({
    namePlayer: String,
    idPlayer: Number,
    registerDate: Date,
    
});

module.exports = mongoose.model("Player", PlayerSchema); //Exportem el model i genera un objecte anomenat Player, realitzant una instancia de totes les dades que nosaltres haguem enmagatzemat amb l'esquema definit