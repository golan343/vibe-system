const jwt = require('jsonwebtoken');

function isLoggedIn(request, response, next) {

  if(!request.headers.authorization) {
    return response.status(401).send('You are not logged in');
  }
  if(!jwt.verify(request.headers.authorization.split(" ").pop(), config.jwt.secretKey)) {
    return response.status(401).send('You are not logged in');
  }
  
  next();
}

module.exports = isLoggedIn;