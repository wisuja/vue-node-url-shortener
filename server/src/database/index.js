require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', () => {
  console.error('Could not connect to the database');
});

db.on('open', () => {
  console.log('Connected successfully to the database');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
