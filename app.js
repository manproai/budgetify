require('dotenv').config();
require('./config/configDbConnect');

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const allRoutes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const myLogger = (req, res, next) => {
  console.log(
    `Requested or Responded at ${new Date().toString()} - ${req.method}`
  );
  next();
};

app.use(cors());
app.use(myLogger);
app.use(express.json());
app.use(passport.initialize());

app.use('/', allRoutes);

app.use(errorHandler);

module.exports = app;
