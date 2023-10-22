const Joi = require('joi');

exports.validation = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  date: Joi.string().required(),
  description: Joi.string().required(),
  currency: Joi.string(),
});