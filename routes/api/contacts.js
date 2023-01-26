const express = require("express");
const router = express.Router();

const createError = require("http-errors");
const Joi = require("joi");

const {contacts: ctrl} = require("../../controllers");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(10).required()
});

const contactsOperations = require("../../models/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.put("/:id", ctrl.updateById);




router.delete("/:id", );

module.exports = router;
