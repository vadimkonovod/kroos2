const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  users: Array,
  date: Date,
});

eventSchema.statics.createNext = function () {
  const event = new Event({ date: new Date(2018, 9, 30) });

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

eventSchema.methods.usersToString = function () {
  return this.users && this.users.length ? this.users.join(', ') : 'Event doesn\'t have any users';
};

const Event = mongoose.model('Event', eventSchema);

exports.Event = Event;
