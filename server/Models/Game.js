const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    gameName: String,
    developer: String,
    developedIn: String
})

const GameModel = mongoose.model("games", GameSchema)

module.exports = GameModel;