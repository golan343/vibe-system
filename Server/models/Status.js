const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'is missing']
  }
}, {
  versionKey: false,
  toJSON: { virtuals: true },
  id: false
});

const Status = mongoose.model('Status', StatusSchema, 'statuses');

module.exports = Status;