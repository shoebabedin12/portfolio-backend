const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema(
  {
    company_name: {
      type: String,
    },
    designation: {
      type: String,
    },
    join_date: {
      type: String,
    },
    leave_date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);
