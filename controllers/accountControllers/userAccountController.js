const { Account } = require('../../models/accountModel');
const { validateAccount } = require('../../validation/validationAccount');

const createAccount = async (req, res, next) => {
  const { error } = await validateAccount.validate(req.body);
  if (error) {
    return next(new Error(error));
  }
  const { accountName, currencyId, accountAmount, accountDescription } =
    req.body;

  const getAvailableAccount = await Account.findOne({ accountName });

  if (getAvailableAccount) {
    return next(
      new Error(`${getAvailableAccount.accountName} already exists.`)
    );
  }

  try {
    const userID = req.user.id;
    const account = await Account.create({
      userId: userID,
      accountName,
      currencyId,
      accountAmount,
      accountDescription,
    });

    res.status(201).json({
      _id: account.id,
      accountName: account.accountName,
      currencyId: account.currencyId,
      accountAmount: account.accountAmount,
      accountDescription: account.accountDescription,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

const updateAccount = async (req, res, next) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    return next(new Error('Not found record with this ID'));
  }

  const updatedAccount = await Account.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedAccount);
};

const deleteAccount = async (req, res, next) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    return next(new Error('Invalid account ID'));
  }

  await account.remove();
  res.status(200).send('Account has been successfully deleted');
};

const getAccounts = async (req, res) => {
  const accounts = await Account.find({});
  res.json(accounts);
};

module.exports = {
  createAccount,
  updateAccount,
  deleteAccount,
  getAccounts,
};
