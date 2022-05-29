const express = require("express");
const api = express.Router();

const { addNewPlayer, getAllPlayers, addPlayerGame, getAllGames} = require('../controllers/player');

api.post('/players', addNewPlayer) 
api.get('/players', getAllPlayers) 
api.post('/players/:id/games', addPlayerGame)
api.get('/players/:id/games', getAllGames)

module.exports = api