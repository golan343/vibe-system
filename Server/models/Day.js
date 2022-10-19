const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'is missing']
  },

  endDate: {
    type: Date,
    required: [true, 'is missing']
  },

  location: {
    type: String,
    required: [true, 'is missing']
  },

  status: {
    type: String,
    required: [true, 'is missing']
  },

  payment: {
    type: String,
    required: [true, 'is missing']
  },

  comment: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserId',
    required: [true]
  }

}, {
  versionKey: false,
  toJSON: { virtuals: true },
  id: false
});

DaySchema.virtual('User', {
  ref: 'UserId',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

const Day = mongoose.model('Day', DaySchema, 'days');

module.exports = Day;