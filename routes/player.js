const express = require("express");
const api = express.Router();

const { addPlayer} = require('../controllers/player');

api.post('/players', addPlayer) 

module.exports = api