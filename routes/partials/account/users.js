require('dotenv').config();
const express = require('express');

const db = require('../../../mock-data/users-data');
const {adminGuard} = require('../../../controllers/authController');
const auth = require('../../../controllers/passport');
const getJWTtoken = require('../../../controllers/jwttoken');



const router = express.Router();


router.post('/login', (req, res) => {
  const user = db.loginUser(req.body.email, req.body.password);

  if (user) {
    const token = getJWTtoken(user);

    res.status(200).json({
      id: user.id,
      email:user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
      token: `Bearer ${token}`
    });

  } else {
    res.status(401).json({message: 'Invalid cridentials'});
  }
});

router.post('/register', (req, res) => {
  const {email, name, surname, password, role} = req.body;
  const result = db.registerUser({email, name, surname, password, role});

  if (result=='registered') {
    res.status(200).send('You have been already registered. Pleas, log in!');
  } else if (result) {
    res.status(200).send(`Dear ${result.name}, you have been successfully registered`);
  } else {
    res.send('Inapropriate data!');
  }
});

router.get('/', auth, adminGuard, (req, res) => {
  res.json(db.usersData);
});

router.post('/', auth, (req, res) => {
  res.send(`Hello World! [POST from user.js] ${req.method}`);
});

router.delete('/', auth, (req, res) => {
  res.send('Hello World! [DELETE from user.js]');
});

router.put('/', auth, (req, res) => {
  res.send('Hello World! [PUT from user.js]');
});

module.exports = {
  router, 
  auth
};
