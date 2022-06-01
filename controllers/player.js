"use strict";

const Player = require("../models/Player");
const PlayerDB = require("../data/crud");
let { dice_game, winRatio, lossRatio } = require("../services/game_logic");


//POST /players: crea un jugador /addNewPlayer

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

//TODO: GET /players: retorna tots els jugadors amb el seu percentatge mig d’èxits /getAllPlayers

const getAllPlayers = async (req, res) => {
  try {
    let players = await PlayerDB.getAllPlayers();
    res.status(200).json({players});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// TODO POST /players/{id}/games: un jugador específic realitza una tirada

const addPlayerGame = async (req, res) => {
  try {
    
    // comprovar que el jugador existeix
    if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
    } else {
      let player = await PlayerDB.getPlayer(req.params.id);
        if (player) { // si hi ha jugador
        let game = dice_game(req.params.id);
        await PlayerDB.addGame(game);

        // Realitzar la tirada
        res.status(200).json({
          message: `Game created successfully!! Congratulations!!!`,
        });
      } else {
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// TODO GET /players/{id}/games: retorna el llistat de jugades per un jugador.

const getAllGames = async (req, res) => {
  try {
    // TODO: si no hi ha jugador, retornar error
        if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
    } else {  // si hi ha jugador, comprovar que existeix
      let player = await PlayerDB.getPlayer(req.params.id);
     
      if (player) { // Retornar el llistat de tirades
        let games = await PlayerDB.getAllGames(player);
        res.status(200).json(games);
      } else {
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// TODO GET /ranking: retorna un ranking de jugadors ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors

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



//TODO PUT /players: modifica el nom del jugador


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


/*
    if (req.body.name) {
      let player0 = new Player();
      player0.name = req.body.name;
      await PlayerDB.modifyPlayer(player0);



    if (!req.body.name) {
      res.status(400).json({ message: "Bad request" });
    } else {
      let player = await PlayerDB.getPlayer(req.params.id);
      if (player) {
        player.name = req.body.name;
        await PlayerDB.modifyPlayer(player);
        res.status(200).json({
          message: `${player.name} modified successfully!! Congratulations!!!`});
      } else {
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
*/




   

//TODO DELETE /players/{id}/games: elimina les tirades del jugador

const deletePlayerGames = async (req, res) => {
  try {
 // TODO: comprovar que hi ha jugador
 if (!req.params.id) {
  res.status(400).json({ message: "Bad request" });
} else {
  let player = await PlayerDB.getPlayer(req.params.id);
   // TODO: si hi ha jugador, comprovar que existeix i esborrar les tirades
     if (player) {
        await PlayerDB.deletePlayerGames(player);
        res.status(200).json({
          message: `Player ${player.name} rolls deleted successfully!! Congratulations!!!`,
        });
      } else {
        res.status(404).json({ message: "Player not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*

// TODO GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit

const loserPlayer = async (req, res) => {
  try {

    let players = await PlayerDB.getAllPlayers();
    let ranking = winRatio(players);
    let total = 0;
    let win = 0;
    let loss = 0;
    for (let i = 0; i < players.length; i++) {
      total += players[i].games.length;
      players[i].games.forEach((game) => {
        if (game.result === "win") {
          win += 1;
        } else {
          loss += 1;
        }
      });
    }
  
    res.status(200).json({
      message: `${loser.name} is the loser!! Congratulations!!!`,
    });
  }

  catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// TODO GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit

const winnerPlayer = async (req, res) => {
  try {
    let players = await PlayerDB.getAllPlayers();
    let ranking = winRatio(players);
    let total = 0;
    let win = 0;
    let loss = 0;
    for (let i = 0; i < players.length; i++) {
      total += players[i].games.length;
      players[i].games.forEach((game) => {
        if (game.result === "win") {
          win += 1;
        } else {
          loss += 1;
        }
      });
    }
    let winRatio = win / total;
    let lossRatio = loss / total;
    let winner = players[0];
    for (let i = 0; i < players.length; i++) {
      if (winRatio < winRatio) {
        winner = players[i];
      }
    }
    res.status(200).json({
      message: `${winner.name} is the winner!! Congratulations!!!`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

};

*/

const generalRanking = async(req, res) => {
  try {
    const totalPlayers = await Player.count()
    const sumWinRate = await Player.sum('winRate')
    const generalWinRate = sumWinRate/totalPlayers
    res.status(200).send({generalWinRate})
  } catch(e){
    res.status(500).send({message:e.message})
  }
}

const getBetterPlayer = async(req, res) => {
  const betterWinRate = await Player.max('winRate')
  console.log(betterWinRate)
  try {
    const player = await Player.findAll({where:{winRate:betterWinRate}})
    res.status(200).send({ player })
  } catch (e) {
    res.status(500).send({message:e.message})
  }
}

const getWorstPlayer = async(req, res) => {
  const worstWinRate = await Player.min('winRate')
  console.log(worstWinRate)
  try {
    const player = await Player.findAll({where:{winRate:worstWinRate}})
    res.status(200).send({ player })
  } catch (e) {
    res.status(500).send({message:e.message})
  }
}

module.exports = {
  addNewPlayer,
  getAllPlayers,
  addPlayerGame,
  getAllGames,
  deletePlayerGames,
  modifyPlayer,
  ranking
}
