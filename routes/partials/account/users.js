const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World! [GET from user.js]');
});

router.post('/', (req, res) => {
  res.send('Hello World! [POST from user.js]');
});

router.delete('/', (req, res) => {
  res.send('Hello World! [DELETE from user.js]');
});

router.put('/', (req, res) => {
  res.send('Hello World! [PUT from user.js]');
});

module.exports = router;
