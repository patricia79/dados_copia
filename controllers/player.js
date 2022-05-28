'use strict'

const Player = require("../models/Player");
const PlayerDB = require("../data/mySQLCRUD");


//POST /players: crea un jugador /addPlayer


const addNewPlayer = (req, res) => {
    try {
      if (!req.body.name) {
        res.status(400).json({ message: "Bad request" });
      } else {
        let player0 = new Player();
        player0.name = req.body.name;
  PlayerDB.addPlayer(player0);
        //envia resposta
        res
          .status(200)
          .json({
            message:`${player0.name} created successfully!! Congratulations!!!` // Jugador creat
          }); 
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  /*
  //TODO GET /players: mostra un jugador creat / Player
  
  const playersGet = (req, res) => {
      try {
        if (!req.body.name) {
          res.status(400).json({ message: "Bad request" });
        } else {
          let player0 = new Player();
          player0.name = req.body.name;
        res.status(200).json({message:`${player0.name}, register_date: new Date`});
      }
    }
    catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    }
  */
  
  module.exports = {
    addNewPlayer   }
  