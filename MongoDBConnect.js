let mongoose = require('mongoose');

const MONG_URI = 'mongodb://localhost:27017/BooksData';

mongoose.connect(MONG_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // Remove the unsupported option
  // useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', function (err) {
  console.log('Error occurred:', err);
});

db.once('connected', function () {
  console.log('Successfully connected to', MONG_URI);
});

module.exports = db;
