const express = require('express');
const Day = require('../models/Day');
const dayLogic = require('../business-logic/day-logic');

const router = express.Router();


router.post('/', async (request, response) => {
  try{
    const day = new Day(request.body);
    const error = await day.validate();
    if(error){
      response.status(400).json(error);
      return;
    }
    const addedDay = await dayLogic.insertDayAsync(day);
    response.status(201).json(addedDay);

  }catch(err){
    response.status(500).send({err: err.message});
  }
});

router.get('/:userId', async (request, response) => {
  try{
    const userId = request.params.userId;
    const days = await dayLogic.getDaysAsync(userId);

    // const sortDays = days.sort((a, b) => b.startDate - a.startDate );
    response.status(200).json(days);

  }catch(err){
    response.status(500).send({err: err.message});
  }
});

router.put('/:_id', async (request, response) => {
  try{
    const day = new Day(request.body);
    day._id = request.params._id;
    const error = await day.validate();
    if(error){
      response.status(400).send({error});
      return;
    }
    const updateDay = await dayLogic.updateDayAsync(day);
    if(!updateDay) {
      response.sendStatus(400);
      return;
    }
    response.json(updateDay);

  }catch(err){
    response.status(500).send({err: err.message});
  }
});

router.delete('/:_id', async (request, response) => {
  try{
    const _id = request.params._id;
    
    await dayLogic.deleteDayAsync(_id);
    response.sendStatus(204);

  }catch(err){
    response.status(500).send({err: err.message});
  }
});


module.exports = router;