const { Player, Games }  = require ("./connectMySQL");

async function  addPlayer (player) {
     return await Player.create({name: player.name, registerDate: player.register_date});
 }
  

module.exports = { addPlayer };