const mongoose = require('mongoose');
const { defaultEvent } = require('./venue');
const { getNextDate } = require('./datetime');
const { UserSchema } = require('./user');

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

EventSchema.statics.createNext = function () {
  const data = {
    date: getNextDate(defaultEvent.week_day),
    price: defaultEvent.price
  };

  return (new Event(data)).save();
};

EventSchema.statics.findNextOrCreate = function () {
  const now = new Date();

  return this
    .findOne({ date: { $gt: now } })
    .then(event => event || this.createNext());
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

EventSchema.methods.usersToMessage = function () {
  if (this.users.length === 0) return 'Event doesn\'t have any users';

  const names = this.users.map(user => `${user.first_name} ${user.last_name}`.trim());

  return names.join('\n');
};

EventSchema.methods.pricePerUser = function () {
  const number = this.users.length;

  return number === 0 ? null : this.price / number;
};

const Event = mongoose.model('Event', EventSchema);

exports.Event = Event;
