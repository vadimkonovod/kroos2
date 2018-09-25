const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    default: 70
  },
  week_day: {
    type: Number,
    required: true,
    default: 0
  },
  hours: {
    type: Number,
    required: true,
    default: 19
  },
  minutes: {
    type: Number,
    required: true,
    default: 30
  }
});

VenueSchema.statics.initDefault = function () {
  return this.findOne().then(event => event || (new Venue).save());
};

const Venue = mongoose.model('Venue', VenueSchema);

exports.Venue = Venue;
