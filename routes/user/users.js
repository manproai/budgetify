const express = require('express');


const router = express.Router();

const {
  createUser,
  loginUser,
  getUsers
} = require('../../controllers/userController');

const { adminGuard } = require('./../../middlewares/adminAuth');
const auth = require('./../../middlewares/passportAuth');

router.get('/', auth, adminGuard ,getUsers);
router.post('/login', loginUser);
router.post('/register', createUser);

router.get('/hello', (req, res) => {
  res.status(201).send('Hello');
});

module.exports = router;