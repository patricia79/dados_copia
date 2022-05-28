const express = require("express");
const api = express.Router();

const { addNewPlayer, getAllPlayers, addPlayerGame} = require('../controllers/player');

api.post('/players', addNewPlayer) 
api.get('/players', getAllPlayers) 
api.post('/players/:id/games', addPlayerGame)

module.exports = api