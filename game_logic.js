"use strict";

function dice_game() {
  let dice1 = Math.floor(6 * Math.random()) + 1;
  let dice2 = Math.floor(6 * Math.random()) + 1;
  let result = dice1 + dice2;
  if (result === 7) {
    score == true
    console.log(`Congratulations!! You've won!! `);
  } else {
    score == false
    console.log(`Sorry, you lost!! `);
  }

  return { dice1, dice2, score, result };
}

let date_now = () =>{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let date_time = date+' '+time;
    return date_time;
};


export {dice_game, date_now}