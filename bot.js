const Event = require('./event').Event;
const TelegramBot = require('node-telegram-bot-api');

function createEvent() {
  const event = new Event({ date: new Date(2018, 9, 30) });

  return event.save();
}

function regme(bot, msg) {
  const now = new Date();

  Event
    .findOne({ date: { $gt: now } })
    .then(event => event || createEvent())
    .then(event => {
      const users = new Set([...event.users, msg.from.username]);
      event.users = Array.from(users);

      return event.save();
    })
    .then(event => {
      bot.sendMessage(msg.chat.id, 'You have been successfully registered.\n' + event.users.join(', '));
    })
    .catch(err => {
      console.log(err);
    });
}

function status(bot, msg) {
  const now = new Date();

  Event
    .findOne({ date: { $gt: now } })
    .then(event => {
      event = event || createEvent();
      const users = event.users && event.users.join(', ');

      bot.sendMessage(msg.chat.id, users || 'Users not found');
    });
}

function init(url, token) {
  const bot = new TelegramBot(token);

  bot.setWebHook(`${url}/bot${token}`);

  bot.onText(/\/regme/, (...args) => regme(bot, ...args));
  bot.onText(/\/status/, (...args) => status(bot, ...args));

  return bot;
}

exports.init = init;
