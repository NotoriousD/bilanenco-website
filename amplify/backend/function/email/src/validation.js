const Joi = require('joi');

exports.validationCreate = Joi.object({
  name: Joi.string().required(),
  subject: Joi.string().required()
});

exports.validationSend = Joi.object({
    name: Joi.string().required(),
    emails: Joi.array().items(Joi.string()).required(),
});