var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true],
    unique: true,
    maxlength: [60, "Name is too big!(Maximum 60 chars)"],
  },
  email:{ 
    type: String,
    required: [true],
    maxlength: [60, "Description is too big!(Maximum 60 chars)"]
  },
  bio: String,
  image: String,
  hash: String,
  salt: String
}, {timestamps: true});

mongoose.model('User', UserSchema);