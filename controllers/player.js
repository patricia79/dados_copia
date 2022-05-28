"use strict";

const Player = require("../models/Player");
const PlayerDB = require("../data/crud");
const dice_game = require("../services/game_logic");

//POST /players: crea un jugador /addPlayer

const addNewPlayer = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Bad request" });
    } else {
      let player0 = new Player();
      player0.name = req.body.name;
      await PlayerDB.addPlayer(player0);
      //envia resposta
      res.status(200).json({
        message: `${player0.name} created successfully!! Congratulations!!!`, // Jugador creat
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//TODO: GET /players: retorna tots els jugadors amb el seu percentatge mig d’èxits /getAllPlayers

const getAllPlayers = async (req, res) => {
  try {
    let players = await PlayerDB.getAllPlayers();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// TODO POST /players/{id}/games: un jugador específic realitza una tirada

const addPlayerGame = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
    } else {
      let player = await PlayerDB.getPlayer(req.params.id);
      if (player) {
        let game = dice_game.dice_game(req.params.id);
        await PlayerDB.addGame(game);

        //TODO: Realitzar la tirada
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

module.exports = {
  addNewPlayer,
  getAllPlayers,
  addPlayerGame,
};
