const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  users: Array,
  date: Date,
});

eventSchema.statics.findNextOrCreate = function () {
  const now = new Date();

  return this
    .findOne({ date: { $gt: now } })
    .then(event => {
      if (event) return event;

      event = new Event({ date: new Date(2018, 9, 30) });

      return event.save();
    });
};

eventSchema.methods.addUser = function (username) {
  const users = this.users.concat(username);
  this.users = Array.from(new Set(users));

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
