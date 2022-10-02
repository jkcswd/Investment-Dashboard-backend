const mongoose = require('mongoose') ;

const connectDb = () => {
  const mongoDB = process.env.MONGO_STRING;
  mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = connectDb;
