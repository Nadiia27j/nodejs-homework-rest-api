const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.number().min(10).required()
  });

const add = async (req, res, next) => {
    try {
      const { error } = contactsSchema.validate(req.body);
      if (error) {
        error.status = 400;
        throw error;
      }
  
      const result = await contactsOperations.addContact(req.body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result
        }
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports = add;