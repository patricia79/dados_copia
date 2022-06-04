const { winRatio } = require("../services/game_logic");
const { Player, Games }  = require ("./connectMySQL");
const { Op } = require("sequelize");


async function  addNewPlayer (player) {  // bbdd: constructor

     return await Player.create({name: player.name, register_date: player.register_date, totalGames: player.totalGames, totalWins: player.totalWins, winRatio: player.winRatio});
 }


 async function  getAllPlayers () {

    return await Player.findAll();
}

async function  getAllPlayersRanking () {

    return await Player.findAll({where: {totalGames: {[Op.gt]: 0}}});
}

async function  getLoserPlayersRanking () {

    return await Player.findAll({where: {totalGames: {[Op.gt]: 0}}, order: [['winRatio', 'ASC']], limit: 1});
}

async function  getWinnerPlayersRanking () {

    return await Player.findAll({where: {totalGames: {[Op.gt]: 0}}, order: [['winRatio', 'DESC']], limit: 1});
}

async function getPlayer(id) {
    return await Player.findOne({where: {idPlayer: id}});
}
  

async function addGame(game) {
    return await Games.create({dice1: game.dice1, dice2: game.dice2, score: game.score, PlayerIdPlayer: game.idPlayer});

}

async function getAllGames(player) {
    //PlayerIdPlayer es la columna de base de datos de la tabla games dnd se almacenan las id de los player (ForeignKey)
    return await Games.findAll({where: {PlayerIdPlayer: player.id}});

}

async function ranking() {
    return await Player.findAll();
    
} 

async function modifyNamePlayerData(player) {

    return await Player.update({name: player.name}, {where: {idPlayer: player.id}});

}


async function deletePlayerGames(game) {
    return await Games.destroy({where: {PlayeridPlayer: game.idPlayer}});
    

}
// loser
//winner

async function updateScore() {
    return await Games.update({score: Games.score});
}



module.exports = { addNewPlayer, getAllPlayers, getPlayer, addGame, getAllGames, ranking, getLoserPlayersRanking, getWinnerPlayersRanking, modifyNamePlayerData, getAllPlayersRanking, deletePlayerGames, updateScore};


   