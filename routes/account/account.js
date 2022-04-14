/*  eslint linebreak-style: ["error", "windows"]  */
const express = require('express');

const router = express.Router();
const {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccounts,
} = require('../../controllers/accountControllers/userAccountController');

const { adminGuard } = require('../../middlewares/adminAuth');
const auth = require('../../middlewares/passportAuth');

router.get('/', auth, adminGuard, getAccounts);
router.post('/', auth, createAccount);
router.put('/:id', auth, updateAccount);
router.delete('/:id', auth, deleteAccount);

module.exports = router;
