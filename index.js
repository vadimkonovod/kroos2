const TOKEN = '624841668:AAEf5KbBf-sY8Qqd9gXbLZGW7uw2qBfkAUw';
const URL = 'https://5c975476.ngrok.io';
const PORT = 3000;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${URL}/bot${TOKEN}`);

bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});

bot.on('inline_query', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Express server is listening on ${PORT}`);
});
