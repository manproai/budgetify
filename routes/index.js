const express = require('express');

const router = express.Router();

const usersRouter = require('./user/users');
const categoryRouter = require('./category/category');
const expensesRouter = require('./financial/expense');
const incomeRouter = require('./financial/income');
const statisticsRouter = require('./statistics/statistics');
const accountRouter = require('./account/account');

router.use('/users', usersRouter);
router.use('/category', categoryRouter);
router.use('/expense', expensesRouter);
router.use('/income', incomeRouter);
router.use('/statistics', statisticsRouter);
router.use('/account', accountRouter);

module.exports = router;
