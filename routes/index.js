const express = require('express');

const router = express.Router();

const usersRouter = require('./partials/account/users');
const categoryRouter = require('./partials/category/category');
const expensesRouter = require('./partials/financial/expense');
const incomeRouter = require('./partials/financial/income');
const statisticsRouter = require('./partials/statistics/statistics');
const accountRouter = require('./partials/account/account');

router.use('/users', usersRouter.router);
router.use('/category', categoryRouter);
router.use('/expense', expensesRouter);
router.use('/income', incomeRouter);
router.use('/statistics', statisticsRouter);
router.use('/account', accountRouter);

module.exports = router;
