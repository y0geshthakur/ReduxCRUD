const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const GameModel = require('./Models/Game')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud');

app.get('/', (req, res) => {
    GameModel.find()
    .then(games => res.json(games))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    GameModel.create(req.body)
    .then(game => res.json(game))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    GameModel.findByIdAndUpdate({_id: id}, {
        gameName: req.body.gameName,
        developer: req.body.developer,
        developedIn: req.body.developedIn
    }).then(game => res.json(game))
    .catch(err => res.json(err))
})

app.delete('/deletegame/:id', (req, res) => {
    const id = req.params.id;
    GameModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running");
})