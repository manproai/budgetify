const Joi = require('joi');

const validateTransaction = Joi.object({
  accountId: Joi.string().required(),
  transactionType: Joi.string().required(),
  transactionTitle: Joi.string().required(),
  categoryId: Joi.string().required(),
  transactionAmount: Joi.number(),
  transactionDescription: Joi.string().required(),
  transactionOperationDate: Joi.date(),
});

module.exports = {
  validateTransaction,
};
