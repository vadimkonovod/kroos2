const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  users: Array,
  date: Date,
});

const Event = mongoose.model('Event', eventSchema);

exports.Event = Event;
