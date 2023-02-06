const express = require("express");
const router = express.Router();

const {validation, ctrlWrapper} = require("../../middlewares");
const {joiContactsSchema, joiStatusSchema} = require("../../schemas/contact");

const {contacts: ctrl} = require("../../controllers");



router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiContactsSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiContactsSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", validation(joiStatusSchema), ctrlWrapper(ctrl.updateStatus));

router.delete("/:id", ctrlWrapper(ctrl.removeById));



module.exports = router;
