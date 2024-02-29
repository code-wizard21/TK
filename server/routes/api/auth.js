const express = require("express");
const router = express.Router();

const authController = require("../../controller/authController");

router.post("/signin", authController.signin);

module.exports = router;
