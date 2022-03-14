const express = require('express');
const auth = require('./../../../controllers/passport');

const router = express.Router();
router.use(auth);

router.get('/', (req, res) => {
  res.send('Hello World! [GET from category.js]');
});

router.post('/', (req, res) => {
  res.send('Hello World! [POST from category.js]');
});

router.delete('/', (req, res) => {
  res.send('Hello World! [DELETE from category.js]');
});

router.put('/', (req, res) => {
  res.send('Hello World! [PUT from category.js]');
});

module.exports = router;
