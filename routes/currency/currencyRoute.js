/*  eslint linebreak-style: ["error", "windows"]  */
const express = require('express');

const router = express.Router();

const {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrencies,
} = require('../../controllers/currencyController');

const { adminGuard } = require('../../middlewares/adminAuth');
const auth = require('../../middlewares/passportAuth');

router.get('/', auth, adminGuard, getCurrencies);
router.post('/create', auth, adminGuard, createCurrency);
router.put('/:id', auth, adminGuard, updateCurrency);
router.delete('/:id', auth, adminGuard, deleteCurrency);

module.exports = router;
