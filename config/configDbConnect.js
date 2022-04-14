require('dotenv').config();
const mongoose = require('mongoose');

const dbURL = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const dbConn = async () => {
  await mongoose.connect(dbURL, (err, data) => {
    if (!err) {
      return console.log('Connected to database');
    }
    return console.log(err);
  });
};

exports.dbConnection = dbConn();
