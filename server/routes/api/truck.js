const express = require("express");
const router = express.Router();

const truckController = require("../../controller/truckController");

router.post("/register", truckController.register);
router.get("/gettrucks", truckController.getTruckList);
router.put("/updatetrucks", truckController.updateTruckList);
router.delete("/deletetrucks", truckController.deleteTruckList);

module.exports = router;
