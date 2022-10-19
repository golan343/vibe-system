const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: [true, 'test'],
    required: [true, 'is missing'],
    trim: true,
    minLength: [5, 'must be 5 minimum charts']
  },

  password: {
    type: String,
    required: [true, 'is missing'],
    trim: true,
    minLength: [5, 'must be 5 minimum charts']
  },

  firstName:{
    type: String,
    required: [true, 'is missing']
  },

  lastName: {
    type: String,
    required: [true, 'is missing']
  },

  email: {
    type: String,
    required: [true, 'is missing'],
    trim: true,
    validate: {
      validator: value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
      message: 'email must be valid!'
    }
  },
  
  // lastLogin: {
  //   type: Date,
  // }
}, {
  versionKey: false,
  toJSON: { virtuals: true },
  id: false
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;