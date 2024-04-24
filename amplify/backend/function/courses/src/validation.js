const Joi = require('joi');

exports.validation = Joi.object({
  id: Joi.string().required(),
  currency: Joi.string().required(),
  date: Joi.string().required(),
  title: Joi.string().required(),
  packages: Joi.array().items(Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    available_places: Joi.number().required()
  })),
});