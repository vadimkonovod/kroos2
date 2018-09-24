const config = require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
const initBot = require('./bot').init;
const Event = require('./event').Event;
const mongoose = require('mongoose');

config();

const {
  URL,
  PORT,
  TOKEN,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASS,
} = process.env;

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
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/admin`, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongo started'));
