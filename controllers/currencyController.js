const { Currency } = require('../models/currencyModel');
const { validateCurrency } = require('../validation/validationCurrency');

const createCurrency = async (req, res, next) => {
  const { error } = await validateCurrency.validate(req.body);
  if (error) {
    return next(new Error(error));
  }
  const { currencyName, currencySymbol } = req.body;

  const getAvailableCurrency = await Currency.findOne({ currencyName });

  if (getAvailableCurrency) {
    return next(new Error(`${getAvailableCurrency.currencyName} already exists.`));
  }

  try {
    const currency = await Currency.create({ currencyName, currencySymbol });

    res.status(201).json({
      currencyName: currency.currencyName,
      currencySymbol: currency.currencySymbol,
      currencyCreated: currency.currencyCreated,
      createdAt: currency.createdAt,
      updatedAt: currency.updatedAt,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

const updateCurrency = async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) {
    return next(new Error('Not found record with this ID'));
  }
  const { currencyName } = req.body.currencyName;

  const getAvailableCurrency = await Currency.findOne(currencyName);

  if (!getAvailableCurrency) {
    return next(new Error('User has invalid cridentials'));
  }

  const updatedCurrency = await Currency.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCurrency);
};

const deleteCurrency = async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) {
    return next(new Error('Not found record with this ID'));
  }

  await currency.remove();
  res.status(200).send('Account has been successfully deleted');
};

const getCurrencies = async (req, res) => {
  const currencies = await Currency.find({});
  res.json(currencies);
};

module.exports = {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrencies,
};
