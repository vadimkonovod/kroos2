const TOKEN = '624841668:AAEf5KbBf-sY8Qqd9gXbLZGW7uw2qBfkAUw';
const URL = 'https://d4ee729a.ngrok.io';
const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const initBot = require('./bot').init;
const Event = require('./event').Event;
const mongoose = require('mongoose');

const bot = initBot(URL, TOKEN);
const app = express();

// APP
app.use(bodyParser.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, console.log.bind(console, `Express server is listening on ${PORT}`));

// DB
mongoose.connect('mongodb://root:football@localhost:27017/admin', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Mongo works');
});