const express = require('express');

const router = express.Router();

const usersRouter = require('./user/users');
const categoryRouter = require('./category/categoryRouter');
const transactionRouter = require('./financial/transactionRouter');
const statisticsRouter = require('./statistics/statistics');
const accountRouter = require('./account/account');
const currencytRouter = require('./currency/currencyRoute');

router.use('/users', usersRouter);
router.use('/category', categoryRouter);
router.use('/transaction', transactionRouter);
router.use('/statistics', statisticsRouter);
router.use('/account', accountRouter);
router.use('/currency', currencytRouter);

module.exports = router;
