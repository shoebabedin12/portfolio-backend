const mongoose = require('mongoose');

const mongodb = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
    } catch (err) {
      console.log(err);
    }
  };


module.exports = mongodb;

