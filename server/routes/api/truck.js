const express = require("express");
const router = express.Router();

const truckController = require("../../controller/truckController");

router.post("/", truckController.createTruck);
router.get("/", truckController.getTrucks);
router.put("/:id", truckController.updateTrucks);
router.delete("/:id", truckController.deleteTruck);

module.exports = router;
