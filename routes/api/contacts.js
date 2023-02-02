const express = require("express");
const router = express.Router();

const {validation, ctrlWrapper} = require("../../middlewares");
const {contactsSchema, statusSchema} = require("../../schemas/contact");

const {contacts: ctrl} = require("../../controllers");

const validateMiddleware = validation(contactsSchema);
const validateFavorite = validation(statusSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", validateFavorite, ctrlWrapper(ctrl.updateStatus));

router.delete("/:id", ctrlWrapper(ctrl.removeById));



module.exports = router;
