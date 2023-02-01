const express = require("express");
const router = express.Router();

const {validation, ctrlWrapper} = require("../../middlewares");
const {contactsSchema} = require("../../schemas");

const {contacts: ctrl} = require("../../controllers");

const validateMiddleware = validation(contactsSchema);



router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.patch("/:id/favorite", validateMiddleware, ctrlWrapper(ctrl.updateStatus));

module.exports = router;
