const express = require("express");
const router = express.Router();

const truckController = require("../../controller/truckController");

router.post("/register", truckController.register);
router.get("/getTruckList", truckController.getTruckList);
router.put("/updateTruckList", truckController.updateTruckList);
router.delete("/deleteTruckList", truckController.deleteTruckList);

module.exports = router;
