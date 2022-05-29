"use strict";
const Game = require("../models/Game");
let { totalWins, totalGames } = require("../data/connectMySQL");

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
  return winRatio;
}

function lossRatio() {
  let lossRatio = (totalGames-totalWins / totalGames)*100;
  return lossRatio;
}
  
module.exports = {dice_game, winRatio, lossRatio};