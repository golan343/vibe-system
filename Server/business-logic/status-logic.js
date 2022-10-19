const StatusWork = require('../models/Status');

function insertStatusAsync(status) {
  return status.save();
}

function getAllStatusesAsync(){
  return StatusWork.find({}).exec();
}

module.exports = {
  insertStatusAsync,
  getAllStatusesAsync
}
