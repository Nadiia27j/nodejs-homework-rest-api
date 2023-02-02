const express = require("express");
const router = express.Router();

const {validation, ctrlWrapper} = require("../../middlewares");
const {contactsSchema, statusSchema} = require("../../schemas");

const {contacts: ctrl} = require("../../controllers");



router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.patch("/:id/favorite", validation(statusSchema), ctrlWrapper(ctrl.updateStatus));

module.exports = router;
