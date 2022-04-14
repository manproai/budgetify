const Joi = require('joi');

const validateCategory = Joi.object({
  categoryName: Joi.string().min(1).max(30).required(),

  categoryType: Joi.string().required(),
});

module.exports = {
  validateCategory,
};
