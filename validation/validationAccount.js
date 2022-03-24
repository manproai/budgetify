const Joi = require('joi');

const validateAccount = Joi.object({
    accountName: Joi.string()
    .min(3)
    .max(128)
    .required(),
    accountCurrency: Joi.string()
    .min(3)
    .required(),
    accountAmount: Joi.number(),
    accountDescription: Joi.string()
    .min(3)
    .required(),
    accountStat: Joi.string()
    .min(3)
});


module.exports = {
    validateAccount
};