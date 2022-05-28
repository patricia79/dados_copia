const express = require("express");
const api = express.Router();

const { addNewPlayer} = require('../controllers/player');

api.post('/players', addNewPlayer) 

module.exports = api