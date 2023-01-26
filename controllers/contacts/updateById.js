const Joi = require("joi");
const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const contactsSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.number().min(10).required()
  });
  

const updateById = async (req, res, next) => {
    try {
      const { error } = contactsSchema.validate(req.body);
      if (error) {
        error.status = 400;
        throw error;
      }
      const { id } = req.params;
      const result = await contactsOperations.updateContact(id, req.body);
  
      if (!result) {
        throw createError(404, `Contact with id=${id} not found`);
      }
  
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      });
    } catch (error) {}
  }

  module.exports = updateById;