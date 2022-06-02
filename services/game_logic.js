"use strict";
const Game = require("../models/Game");
const Player = require("../models/Player");


function dice_game(idGame) {
  let dice1 = Math.floor(6 * Math.random()) + 1;
  let dice2 = Math.floor(6 * Math.random()) + 1;
  let score = false
  if (dice1 + dice2 === 7) {
 score = true
    console.log(`Congratulations!! You've won!! `);
  } else {
    score = false
    console.log(`Sorry, you lost!! `);
  }

  return new Game(dice1, dice2, score, idGame);
}

function winRatio() {

  let winRatio = (totalWins / totalGames)*100;

   return new Player(id, name, register_date, winRatio, totalGames, totalWins);
}

function lossRatio() {

  let lossRatio = (totalGames-totalWins / totalGames)*100;

  return new Player(id, name, register_date, winRatio, totalGames, totalWins, lossRatio);
}

 
module.exports = {dice_game, winRatio, lossRatio};