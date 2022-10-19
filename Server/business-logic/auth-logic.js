const User = require('../models/User');
const hash = require('../helpers/hash');

function registerAsync(user) {
  user.password = hash(user.password);
  return user.save();
}

function loginAsync(credentials) {
  credentials.password = hash(credentials.password);
  return User.findOne({ userName: credentials.userName, password: credentials.password }).exec();
}

module.exports = {
  registerAsync,
  loginAsync
}

