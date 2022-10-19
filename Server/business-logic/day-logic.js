const Day = require('../models/Day');

function insertDayAsync(day){
  return day.save();
}

function getDaysAsync(userId){
  return Day.find({userId: userId}).exec();
}

async function updateDayAsync(day) {
  const info = await Day.updateOne({ _id: day._id }, day).exec();
  return info.modifiedCount ? day : null;
};

function deleteDayAsync(_id) {
  return Day.deleteOne({_id}).exec();
}


module.exports = {
  insertDayAsync,
  getDaysAsync,
  updateDayAsync,
  deleteDayAsync
}
