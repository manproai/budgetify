const { Transaction } = require('../models/transactionModel');
const { Account } = require('../models/accountModel');
const { validateTransaction } = require('../validation/validationTransaction');

const createTransaction = async (req, res, next) => {
  const { error } = await validateTransaction.validate(req.body);
  if (error) {
    return next(new Error(error));
  }
  const {
    accountId,
    transactionType,
    transactionTitle,
    categoryId,
    transactionAmount,
    transactionDescription,
    transactionOperationDate,
  } = req.body;

  try {
    const transaction = await Transaction.create({
      accountId,
      transactionType,
      transactionTitle,
      categoryId,
      transactionAmount,
      transactionDescription,
      transactionOperationDate,
    });

    res.status(201).json({
      _id: transaction.id,
      accountId: transaction.accountId,
      transactionType: transaction.transactionType,
      transactionTitle: transaction.transactionTitle,
      categoryId: transaction.categoryId,
      transactionAmount: transaction.transactionAmount,
      transactionDescription: transaction.transactionDescription,
      transactionOperationDate: transaction.transactionOperationDate,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

const updateTransaction = async (req, res, next) => {
  const account = await Account.findById(req.body.accountId);

  if (!account) {
    return next(new Error('Invalid account'));
  }

  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new Error('Not found record with this ID'));
  }

  const updatedTransaction = await Transaction.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedTransaction);
};

const deleteTransaction = async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new Error('Invalid transaction'));
  }

  await transaction.remove();
  res.status(200).send('Transaction has been successfully deleted');
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
};
