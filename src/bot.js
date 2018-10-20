const { Event } = require('./event');
const { Venue } = require('./venue');
const TelegramBot = require('node-telegram-bot-api');
const { statusMsg, usersMsg } = require('./templates');

function regme(bot, { chat, from }) {
  Event
    .findNextOrCreate()
    .then(event => event.addUser(from))
    .then(event => bot.sendMessage(chat.id, 'You have been successfully registered.\n' + usersMsg(event)))
    .catch(console.error);
}

function status(bot, { chat }) {
  Event
    .findNextOrCreate()
    .then(event => bot.sendMessage(chat.id, statusMsg(event)))
    .catch(console.error);
}

function dropoff(bot, { chat, from }) {
  Event
    .findNextOrCreate()
    .then(event => event.removeUser(from))
    .then(event => bot.sendMessage(chat.id, 'You have been successfully unregistered.\n' + usersMsg(event)))
    .catch(console.error);
}

function setPrice(bot, { text, chat }) {
  const price = +(text.split(' ')[1]);

  if (isNaN(price) || price < 1) {
    bot.sendMessage(chat.id, `${price} is not valid for price`);

    return;
  }

  Venue.findOneAndUpdate({}, { price })
    .then(() => Event.updatePrice(price))
    .then(() => bot.sendMessage(chat.id, 'Price was successfully updated'))
    .catch(console.error)
}

function setWeekday(bot, { text, chat }) {
  const day = +(text.split(' ')[1]);

  if (isNaN(day) || !(0 <= day <= 7)) {
    bot.sendMessage(chat.id, `${text} is not valid for day`);

    return;
  }

  Venue.findOneAndUpdate({}, { week_day: day })
    .then(() => Event.updateDay(day))
    .then(() => bot.sendMessage(chat.id, 'Weekday was successfully updated'))
    .catch(console.error)
}

function init(url, token) {
  const bot = new TelegramBot(token);

  bot.setWebHook(`${url}/bot${token}`);

  bot.onText(/\/regme/, regme.bind(this, bot));
  bot.onText(/\/status/, status.bind(this, bot));
  bot.onText(/\/dropoff/, dropoff.bind(this, bot));
  bot.onText(/\/set_price/, setPrice.bind(this, bot));
  bot.onText(/\/set_weekday/, setWeekday.bind(this, bot));

  return bot;
}

exports.init = init;
