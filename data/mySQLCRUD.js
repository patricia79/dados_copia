const { Player, Games }  = require ("./connectMySQL");

async function  addNewPlayer (player) {  // bbdd: constructor

     return await Player.create({name: player.name, register_date: player.register_date});
 }


 async function  getAllPlayers () {

    return await Player.findAll();
}

async function getPlayer(player) {
    return await Player.findOne({where: {id: player.id}});
}
  

async function addGame(game) {
    return await Games.create({dice1: game.dice1, dice2: game.dice2, score: game.score, PlayerIdPlayer: game.idPlayer});

}

async function getAllGames(player) {
    return await Games.findAll({where: {PlayerId: player.id}});

}

async function ranking() {
    return await Player.findAll({order: [['score', 'DESC']]});
    
} 

async function modifyPlayer(player) {

    return await Player.update({name: player.name}, {where: {id: player.id}});

}


async function deletePlayerGames(game) {
    return await Games.destroy({where: {PlayeridPlayer: game.idPlayer}});
    

}
// loser
//winner

async function updateScore() {
    return await Games.update({score: Games.score});
}



module.exports = { addNewPlayer, getAllPlayers, getPlayer, addGame, getAllGames, ranking, modifyPlayer, deletePlayerGames, updateScore};


   