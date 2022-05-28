"use strict";
const Game = require("../models/Game");


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

let date_now = () =>{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let date_time = date+' '+time;
    return date_time;
};


module.exports = {dice_game, date_now}