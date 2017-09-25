const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let memberNameValidator = [
   function (val) {
      return (val.length > 0)
}, ' Please complete the form!'
]


const standupSchema = new Schema({
  memberName: {type: String, require: true,validate: memberNameValidator},
  project: String,
  workYesterday: String,
  workToday: String,
  impediment: String,
  createOn: {
    type: Date,
    default: Date.now
  }
})

//exports models
module.exports = mongoose.model('Standup',standupSchema);
