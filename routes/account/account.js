const express = require('express');

const router = express.Router();
const {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccounts
} = require('../../controllers/accountControllers/userAccountController');

const { adminGuard } = require('./../../middlewares/adminAuth');
const auth = require('./../../middlewares/passportAuth');

router.get('/', auth, adminGuard ,getAccounts);
router.post('/', auth, createAccount);
router.put('/:id', auth, updateAccount);
router.delete('/:id', auth, deleteAccount);

module.exports = router;













// const express = require('express');
// const accountData = require('../../mock-data/account-data');
// const auth = require('../../middlewares/passport');

// const router = express.Router();
// router.use(auth);


// router.get('/', (req, res) => {
//   res.json(accountData);
// });

// router.get('/:id', (req, res) => {
//   const userData = accountData.filter(item => item.id==req.params.id);
//   if (userData.length)
//   {
//     res.json(userData);
//   } else {
//     res.send(`There is no Account with this ID : ${req.params.id}`);
//   }
// });


// router.post('/', (req, res) => {
//   if (req.body.id && req.body.login && req.body.password && req.body.currency)
//   {
//     const checkID = accountData.filter(item => item.id==req.body.id);
//     if (!checkID.length)
//     {
//       res.send(`New account has been added. Login: ${req.body.login}`);
//       accountData.push(req.body);
//     } else {
//       res.send(`Account with this ID: ${req.body.id} is already exist please go to Login`);
//     }
//   } else {
//     res.send('Not appropriate Data!');
//   }
// });

// router.delete('/:id', (req, res) => {
//   const userData = accountData.filter(item => item.id==req.params.id);

//   if (userData.length)
//   {
//     res.send(`${userData[0].login} user has been deleted`);
//     const arrIndex = accountData.indexOf(userData[0]);
//     accountData.splice(arrIndex,1);
//   } else {
//     res.send(`There is no user with this ID ${req.params.id}`);
//   }
// });

// router.put('/', (req, res) => {
//   const userData = accountData.filter(item => item.id==req.body.id);
//   if (userData.length)
//   {
//     const arrIndex = accountData.indexOf(userData[0]);
//     accountData[arrIndex] = req.body;
//     res.send(`${userData[0].login} user has been updated to ${accountData[arrIndex].login}`);
//   } else {
//     res.send(`No Account found with this ID: ${req.body.id}`);
//   }
// });

// module.exports = router;
