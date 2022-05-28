'use strict'

const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

let GameSchema = Schema({
    idGame: Number,
    dice1 : Number,
    dice2 : Number,
    result: Number,
    score: Boolean,
    idPlayer: {type: Schema.ObjectId, ref: "Player"} //Referenciara un id d'objecte de la col.leccio Player
});

module.exports = mongoose.model("Game",GameSchema);