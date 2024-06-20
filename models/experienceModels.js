const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  join_date: {
    type: Date,
    required: true,
  },
  leave_date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
