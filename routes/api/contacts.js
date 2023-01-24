const express = require("express");
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

const contacts = require("../../models/contacts.json");

router.get("/", async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    }
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = contacts.find(contact => contact.id === id);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
});

router.post("/", async (req, res, next) => {
  // console.log("обєкт",req.body);
  const newContact = { ...req.body, id: uuidv4() }
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact
    }
  });
});


router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
