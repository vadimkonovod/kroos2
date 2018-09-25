const mongoose = require('mongoose');
const { getNextDate } = require('./datetime');
const { UserSchema } = require('./user');
const { Venue } = require('./venue');

const EventSchema = new mongoose.Schema({
  users: {
    type: [UserSchema],
    default: []
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

EventSchema.statics.createNext = async function () {
  const { price, week_day, hours, minutes } = await Venue.findOne();
  const date = getNextDate(week_day, hours, minutes);

  return (new Event({ date, price })).save();
};

EventSchema.statics.findNextOrCreate = function () {
  const now = new Date();

  return this
    .findOne({ date: { $gt: now } })
    .then(event => event || this.createNext());
};

EventSchema.statics.updatePrice = async function (price) {
  const event = await Event.findNextOrCreate();

  event.price = price;

  return event.save();
};

EventSchema.statics.updateDay = async function (day) {
  const event = await Event.findNextOrCreate();

  event.date = getNextDate(day, event.date.getHours(), event.date.getMinutes());

  return event.save();
};

EventSchema.methods.addUser = function ({ id, username, first_name, last_name }) {
  const users = this.users.filter(user => user.id !== id);
  this.users = users.concat({ id, username, first_name, last_name });

  return this.save();
};

EventSchema.methods.removeUser = function ({ id }) {
  this.users = this.users.filter(user => user.id !== id);

  return this.save();
};

EventSchema.methods.pricePerUser = function () {
  const number = this.users.length;

  return number === 0 ? null : this.price / number;
};

const Event = mongoose.model('Event', EventSchema);

exports.Event = Event;
