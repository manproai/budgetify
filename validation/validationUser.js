const Joi = require('joi');

const validateUser = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  role: Joi.string().min(3).required(),
  dateOfBirth: Joi.number().integer().min(1900).max(2013),
  gender: Joi.string().required(),
  country: Joi.string().required(),
});

module.exports = {
  validateUser,
};
