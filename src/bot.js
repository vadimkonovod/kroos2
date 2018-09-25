const Event = require('./event').Event;
const TelegramBot = require('node-telegram-bot-api');

function regme(bot, { chat, from }) {
  Event
    .findNextOrCreate()
    .then(event => event.addUser(from.username))
    .then(event => bot.sendMessage(chat.id, 'You have been successfully registered.\n' + event.usersToString()))
    .catch(console.error);
}

function status(bot, { chat }) {
  Event
    .findNextOrCreate()
    .then(event => bot.sendMessage(chat.id, event.usersToString()))
    .catch(console.error);
}

function dropoff(bot, { chat, from }) {
  Event
    .findNextOrCreate()
    .then(event => event.removeUser(from.username))
    .then(event => bot.sendMessage(chat.id, 'You have been successfully unregistered.\n' + event.usersToString()))
    .catch(console.error);
}

function init(url, token) {
  const bot = new TelegramBot(token);

  bot.setWebHook(`${url}/bot${token}`);

  bot.onText(/\/regme/, regme.bind(this, bot));
  bot.onText(/\/status/, status.bind(this, bot));
  bot.onText(/\/dropoff/, dropoff.bind(this, bot));

  return bot;
}

exports.init = init;
