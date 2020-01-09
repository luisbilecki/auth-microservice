const mongoose = require('mongoose');

let isConnected = 0;

const connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  return mongoose
    .connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      isConnected = mongoose.connection.readyState;
    });
};

module.exports = connectToDatabase;
