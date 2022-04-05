const express = require('express');

const router = express.Router();

const auth = require('../../middlewares/passportAuth');
const {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
} = require('../../controllers/transactionController');

router.get('/', auth, getTransactions);
router.post('/', auth, createTransaction);
router.put('/:id', auth, updateTransaction);
router.delete('/:id', auth, deleteTransaction);

module.exports = router;
