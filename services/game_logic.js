"use strict";
const Game = require("../models/Game");
const Player = require("../models/Player");


function dice_game(id) {
  let dice1 = Math.floor(6 * Math.random()) + 1;
  let dice2 = Math.floor(6 * Math.random()) + 1;
  let result = dice1 + dice2;
  let score = false;
  if (result === 7) {
    score = true
    console.log(`Congratulations!! You've won!! `);
  } else {
    score = false
    console.log(`Sorry, you lost!! `);
  }

  return new Game(dice1, dice2, score, result, id);
}

function winRatio() {

  let winRatio = (totalWins / totalGames)*100;

   return new Player(idPlayer, name, registerDate, winRatio, totalGames, totalWins);
}

function lossRatio() {

  let lossRatio = (totalGames-totalWins / totalGames)*100;

  return new Player(idPlayer, name, registerDate, winRatio, totalGames, totalWins);
}
/*
function updateScore() {
 
  
for (const vehiculo of arrayVehiculos) {
  if (vehiculo.combustible == "g") {
    console.log(vehiculo.nombre, vehiculo.marca, vehiculo.matricula);
  }
}

  return new Player(idPlayer, name, registerDate, winRatio, totalGames, totalWins);
  
}
*/
 
module.exports = {dice_game, winRatio, lossRatio};