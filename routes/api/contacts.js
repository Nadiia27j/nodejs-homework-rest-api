const express = require("express");
const router = express.Router();

const createError = require("http-errors");
const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(10).required(),
})

const productsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await productsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    next(error);
    
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsOperations.getContactById(id);

    if (!result) {
      throw createError(404, `Contact with id=${id} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
   
  }
});



router.post("/", async (req, res, next) => {
  try {
    const {error} = contactsSchema.validate(req.body);
    if(error) {
      error.status = 400;
      throw error;
    }
    
    const result = await productsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
});



router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
