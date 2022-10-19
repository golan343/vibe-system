const express = require('express');
const Status = require('../models/Status');
const statusLogic = require('../business-logic/status-logic');

const router = express.Router();

router.post('/', async (request, response) => {
  try{  
    const status = new Status(request.body);
    const error = await status.validate();
    if(error){
      response.status(400).json(error);
      return;
    }
    const addedStatus = await statusLogic.insertStatusAsync(status);
    response.status(201).json(addedStatus);

  }catch(err){
    response.status(500).send({err: err.message});
  }
});

router.get('/', async (request, response) => {
  try{  
    const statuses = await statusLogic.getAllStatusesAsync();
    response.status(200).json(statuses);

  }catch(err){
    response.status(500).send({err: err.message});
  }
});

module.exports = router;