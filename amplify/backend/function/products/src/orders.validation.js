const Joi = require('joi');

exports.validation = Joi.object({
  id: Joi.string().required(),
  product_type: Joi.string().required(),
  email: Joi.string().required(),
  fullName: Joi.string().allow(null),
  package_id: Joi.string().allow(null),
  phone: Joi.string().allow(null),
  subscribe: Joi.boolean().required(),
  currency: Joi.string().required(),
  contact_id: Joi.string().allow(null),
  funnel: Joi.string().allow(null),
});