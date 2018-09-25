const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  first_name: String,
  last_name: String,
  username: String
});

exports.UserSchema = UserSchema;
