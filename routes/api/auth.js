const express = require('express');

const {validation, ctrlWrapper, auth} = require("../../middlewares");
const {auth: ctrl} = require("../../controllers");
const {joiAuthSchema} = require("../../models/user")

const router = express.Router();

router.post("/register",validation(joiAuthSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiAuthSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));



module.exports = router;