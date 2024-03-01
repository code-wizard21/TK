const express = require("express");
const router = express.Router();

const pickupController = require("../../controller/pickupController");

router.get("/", pickupController.getPickupLocations);

module.exports = router;
