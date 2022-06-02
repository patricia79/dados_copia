"use strict";

const Player = require("../models/Player");
const PlayerDB = require("../data/crud");
let { dice_game, winRatio, lossRatio } = require("../services/game_logic");


 //TODO POST /players: crea un jugador// addNewPlayer

const addNewPlayer = async (req, res) => {
  try {

    // si te nom, que el guardi en la base de dades
    if (req.body.name) {
      let player0 = new Player();
      player0.name = req.body.name;
      await PlayerDB.addNewPlayer(player0);
      //envia resposta
      res.status(200).json({message: `${player0.name} created successfully!! Congratulations!!!`,});
    } else { // si no te nom, que el jugador que creï sigui ANONYMOUS
       req.body.name = "ANONYMOUS"
      let player1 = new Player();
      player1.name = req.body.name;
      await PlayerDB.addNewPlayer(player1);// 
      //envia resposta
      res.status(200).json({message: `${player1.name} created successfully!! Congratulations!!!`,});
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//TODO: // GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits / getAllPlayers

const getAllPlayers = async (req, res) => {
  try {
    let players = await PlayerDB.getAllPlayers();
    res.status(200).json({players});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// TODO POST /games/{id}: un jugador específic realitza una tirada / addPlayerGame

const addPlayerGame = async (req, res) => {
  try {
    
    // si no hi ha id...
    if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
    } else { // si hi ha id...
      let player = await PlayerDB.getPlayer(req.params.id);
        if (player) { // si hi ha jugador
        let game = dice_game(req.params.id);
        await PlayerDB.addGame(game);

        // Realitzar la tirada
        res.status(200).json({
          message: `Game created successfully!! Congratulations!!!`,
        });
      } else {// si el jugador no existeix
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// TODO  GET /games/{id}: retorna el llistat de jugades per un jugador / getAllGames

const getAllGames = async (req, res) => {
  try {
   // si no hi ha id...
        if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
    } else {  // si hi ha id...
      let player = await PlayerDB.getPlayer(req.params.id);
     
      if (player) { // si hi ha jugador
        let games = await PlayerDB.getAllGames(player); //Retornar el llistat de tirades
        res.status(200).json({message: {games}});
      } else { // si el jugador no existeix
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//TODO  DELETE /games/{id}: elimina les tirades del jugador /deletePlayerGames

const deletePlayerGames = async (req, res) => {
  try {
// si no hi ha id...
 if (!req.params.id) {
  res.status(400).json({ message: "Bad request" });
  
} else { // si hi ha id...
  let player = await PlayerDB.getPlayer(req.params.id);
   // si hi ha jugador
     if (player) {
        await PlayerDB.deletePlayerGames(player);
        res.status(200).json({
          message: `Player ${player.name} rolls deleted successfully !! Congratulations!!!`, // tirades eliminades
        });
      } else { // si el jugador no existeix
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// TODO  GET /ranking: retorna un ranking de jugadors ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors / ranking

const ranking = async (req, res) => {
  try {

    if (Game.score = true) {
    await Player.increment(['totalGames','totalWins'],{where: {PlayeridPlayer: game.idPlayer}})  
    } else {
    await Player.increment(['totalGames'],{where: {PlayeridPlayer: game.idPlayer}})  
    }
  
    let players = await PlayerDB.getAllPlayers();    
    winRatio(players); 
   
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const generalRanking = async(req, res) => {
  try {
    const totalPlayers = await Player.count()
    const sumWinRate = await Player.sum('winRate')
    const generalWinRate = sumWinRate/totalPlayers
    res.status(200).send({generalWinRate})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}



//TODO  PUT players/{id}: modifica el nom del jugador / modifyPlayer

const modifyPlayer = async(req, res) =>{
  const idPlayer = req.params.id
  const { namePlayer } = req.body.name
  try{
        const player = await Player.findByPk({
      where:{
        idPlayer:idPlayer
      } })
      await Player.update({namePlayer},{where:{idPlayer: idPlayer}},)
   
    res.status(200).json({message: `${player.namePlayer} modified successfully!! Congratulations!!!`});
  } catch (error){
    res.status(404).json({message: 'player not found'})
  }
}






// TODO // GET /ranking/loser: retorna el jugador amb pitjor percentatge d’èxit / loserPlayer


const loserPlayer = async(req, res) => {
  const worstWinRate = await Player.min('winRate')
  console.log(worstWinRate)
  try {
    const player = await Player.findAll({where:{winRate:worstWinRate}})
    res.status(200).send({ player })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}



// TODO // GET /ranking/winner: retorna el jugador amb millor percentatge d’èxit / winnerPlayer

const winnerPlayer = async(req, res) => {
  const betterWinRate = await Player.max('winRate')
  console.log(betterWinRate)
  try {
    const player = await Player.findAll({where:{winRate:betterWinRate}})
    res.status(200).json({message: {player}})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}



module.exports = {
  addNewPlayer,
  getAllPlayers,
  addPlayerGame,
  getAllGames,
  deletePlayerGames,
  modifyPlayer,
  ranking,
  generalRanking,
  loserPlayer,
  winnerPlayer
}
