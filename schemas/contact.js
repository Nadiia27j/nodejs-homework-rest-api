const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(10).required()
});

module.exports = contactsSchema;
