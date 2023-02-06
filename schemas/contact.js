
const Joi = require("joi");

const joiContactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(10).required(),
  favorite: Joi.boolean(),
});


const joiStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
})


module.exports = {joiContactsSchema, joiStatusSchema};
