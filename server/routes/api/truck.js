const express = require("express");
const router = express.Router();

const truckController = require("../../controller/truckController");

router.post("/", truckController.createTruck);
router.get("/", truckController.getTrucks);
router.get("/by/:company", truckController.getTrucksByCompany);
router.put("/:id", truckController.updateTrucks);
router.delete("/:id", truckController.deleteTruck);

module.exports = router;
