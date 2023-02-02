
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(10).required(),
  favorite: Joi.boolean().required(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {contactsSchema, statusSchema};
