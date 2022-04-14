/*  eslint linebreak-style: ["error", "windows"]  */
const Joi = require('joi');

const validateCurrency = Joi.object({
  currencyName: Joi.string().min(1).max(30).required(),

  currencySymbol: Joi.string().min(1).required(),
});

module.exports = {
  validateCurrency,
};
