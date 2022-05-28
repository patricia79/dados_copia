const { Player, Games }  = require ("./connectMySQL");

async function  addPlayer (player) {

     return await Player.create({name: player.name, registerDate: player.register_date});
 }

 async function  getAllPlayers () {

    return await Player.findAll();
}

async function getPlayer(id) {
    return await Player.findOne({where: {idPlayer: id}});
}
  
module.exports = { addPlayer, getAllPlayers, getPlayer };


   