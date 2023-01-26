const express = require("express");
const router = express.Router();

const createError = require("http-errors");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(10).required()
});

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);

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
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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
});



router.put("/:id", async (req, res, next) => {
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
});




router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    
    if (!result) {
      throw createError(404, `Contact with id=${id} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted ",
      data: {
        result
      }
    })

  } catch (error) {
    next(error);
  }
  
});

module.exports = router;
