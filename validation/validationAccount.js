const Joi = require('joi');

const validateAccount = Joi.object({
  accountName: Joi.string().min(3).max(128).required(),
  currencyId: Joi.string().min(3).required(),
  accountAmount: Joi.number(),
  accountDescription: Joi.string().min(3),
});

module.exports = {
  validateAccount,
};
