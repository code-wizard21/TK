const express = require("express");
const router = express.Router();

const truckController = require("../../controller/truckController");

router.post("/", truckController.register);
router.get("/:id", truckController.getTruckList);
router.put("/:id", truckController.updateTruckList);
router.delete("/:id", truckController.deleteTruckList);

module.exports = router;
