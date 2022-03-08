const express = require('express');
const accountData = require('../../../mock-data/account-data');

const router = express.Router();


router.get('/', (req, res) => {
  res.json(accountData);
});

router.get('/:id', (req, res) => {
  const userData = accountData.filter(item => item.id==req.params.id);
  if (userData.length)
  {
    res.json(userData);
  } else {
    res.send(`There is no Account with this ID : ${req.params.id}`);
  }
});


router.post('/', (req, res) => {
  if (req.body.id && req.body.login && req.body.password && req.body.currency)
  {
    const checkID = accountData.filter(item => item.id==req.body.id);
    if (!checkID.length)
    {
      res.send(`New account has been added. Login: ${req.body.login}`);
      accountData.push(req.body);
    } else {
      res.send(`Account with this ID: ${req.body.id} is already exist please go to Login`);
    }
  } else {
    res.send('Not appropriate Data!');
  }
});

router.delete('/:id', (req, res) => {
  const userData = accountData.filter(item => item.id==req.params.id);

  if (userData.length)
  {
    res.send(`${userData[0].login} user has been deleted`);
    const arrIndex = accountData.indexOf(userData[0]);
    accountData.splice(arrIndex,1);
  } else {
    res.send(`There is no user with this ID ${req.params.id}`);
  }
});

router.put('/', (req, res) => {
  const userData = accountData.filter(item => item.id==req.body.id);
  if (userData.length)
  {
    const arrIndex = accountData.indexOf(userData[0]);
    accountData[arrIndex] = req.body;
    res.send(`${userData[0].login} user has been updated to ${accountData[arrIndex].login}`);
  } else {
    res.send(`No Account found with this ID: ${req.body.id}`);
  }
});

module.exports = router;