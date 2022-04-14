/*  eslint linebreak-style: ["error", "windows"]  */
const express = require('express');
const auth = require('../../middlewares/passportAuth');

const router = express.Router();
router.use(auth);

router.get('/', (req, res) => {
  res.send('Hello World! [GET from statistics.js]');
});

router.post('/', (req, res) => {
  res.send('Hello World! [POST from statistics.js]');
});

router.delete('/', (req, res) => {
  res.send('Hello World! [DELETE from statistics.js]');
});

router.put('/', (req, res) => {
  res.send('Hello World! [PUT from statistics.js]');
});

module.exports = router;
