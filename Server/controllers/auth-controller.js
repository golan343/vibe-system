const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authLogic = require('../business-logic/auth-logic');

const router = express.Router();

router.post('/register', async (request, response) => {
  try{
    const user = new User(request.body);
    const error = await user.validate();
    if(error){
      response.status(400).json(error);
      return;
    }
    const addedUser = await authLogic.registerAsync(user);
    addedUser.password = undefined;
    response.status(201).json(addedUser);
  }catch(err){
    response.status(500).send({err: err.message});
  }
});

router.post('/login', async (request, response) => {
  try {
    const user = await authLogic.loginAsync(request.body);
    if(!user) {
      response.status(401).send('Incorrect userName or password!');
      return;
    }
    const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: '30m'});
    user.password = undefined;
    console.log('success');
    response.status(200).json({ user, token });
  }
  catch(err) {
    response.status(500).send({ err: err.message })
  }
  
});

router.post('/logout', (request, response) => {
  try {
    const user = request.body;
    
    const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: '0'});
    user.password = undefined;
    console.log('success logout');
    response.status(200).json({ user, token });
  }
  catch(err) {
    response.status(500).send({ err: err.message })
  }
  
});

module.exports = router;