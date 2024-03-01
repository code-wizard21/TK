const express = require("express");
const router = express.Router();

const dropController = require("../../controller/dropController");

router.get("/", dropController.getDropLocations);

module.exports = router;
