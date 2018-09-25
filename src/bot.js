const Event = require('./event').Event;
const TelegramBot = require('node-telegram-bot-api');
const { toHumanReadable } = require('./datetime');

function regme(bot, { chat, from }) {
  Event
    .findNextOrCreate()
    .then(event => event.addUser(from))
    .then(event => bot.sendMessage(chat.id, 'You have been successfully registered.\n' + event.usersToMessage()))
    .catch(console.error);
}

function status(bot, { chat }) {
  Event
    .findNextOrCreate()
    .then(event => `Next event planned on ${toHumanReadable(event.date)}.\n` +
      `Price: ${event.price}, per person: ${event.pricePerUser()}\n` +
      `Participants: ${event.usersToMessage()}`
    )
    .then(message => bot.sendMessage(chat.id, message))
    .catch(console.error);
}

function dropoff(bot, { chat, from }) {
  Event
    .findNextOrCreate()
    .then(event => event.removeUser(from))
    .then(event => bot.sendMessage(chat.id, 'You have been successfully unregistered.\n' + event.usersToMessage()))
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
