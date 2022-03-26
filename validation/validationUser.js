const Joi = require('joi');

const validateUser = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(8).required(),
  role: Joi.string().min(3),
  dateOfBirth: Joi.string().min(3),
  country: Joi.string().min(3),
});

module.exports = {
  validateUser,
};
