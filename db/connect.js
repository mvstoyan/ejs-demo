const mongoose = require('mongoose');

const connectDB = (url) => {  // Connect to a MongoDB database using Mongoose
  return mongoose.connect(url);
}

module.exports = connectDB;
