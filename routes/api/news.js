const express = require("express");

const { news: ctrl } = require("../controllers");

const { ctrlWrapper }  = require("../../middlewares");

const router = express.Router();

router.get("/news", ctrlWrapper(ctrl.getAllNews));

module.exports = router;