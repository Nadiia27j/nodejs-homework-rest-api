const express = require('express');

const {validation, ctrlWrapper} = require("../../middlewares");
const {auth: ctrl} = require("../../controllers");
const {joiAuthSchema} = require("../../models/user")

const router = express.Router();

router.post("/register",validation(joiAuthSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiAuthSchema), ctrlWrapper(ctrl.login));



module.exports = router;