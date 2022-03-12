const express = require('express');
const allRoutes = require('./routes/index');

require('dotenv').config();

const app = express();

const myLogger = (req, res, next) => {
  console.log(`Requested or Responded at ${new Date().toString()} - ${req.method}`);
  next();
};
app.use(myLogger);
app.use(express.json());

app.use('/', allRoutes);

app.listen(process.env.PORT);
