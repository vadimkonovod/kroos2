const mongoose = require('mongoose');
const { defaultEvent } = require('./venue');
const { getNextDate } = require('./datetime');

const eventSchema = new mongoose.Schema({
  users: Array,
  date: Date
});

eventSchema.statics.createNext = function () {
  const event = new Event({ date: getNextDate(defaultEvent.week_day) });

  return event.save();
};

eventSchema.statics.findNextOrCreate = function () {
  const now = new Date();

  return this
    .findOne({ date: { $gt: now } })
    .then(event => event || this.createNext());
};

eventSchema.methods.addUser = function (username) {
  const users = this.users.filter(name => name !== username);
  this.users = users.concat(username);

  return this.save();
};

eventSchema.methods.removeUser = function (username) {
  this.users = this.users.filter(name => name !== username);

  return this.save();
};

eventSchema.methods.usersToMessage = function () {
  if (this.users && this.users.length) return 'Event doesn\'t have any users';

  return this.users.join('\n ');
};

const Event = mongoose.model('Event', eventSchema);

exports.Event = Event;
