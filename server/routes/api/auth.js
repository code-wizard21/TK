const express = require("express");
const router = express.Router();

const authController = require("../../controller/authController");

router.post("/register", authController.Register);
router.post("/sigin", authController.signin);
router.put("/update:id",authController.authUpdate);
router.delete("/delete:id",authController.authDelete);
router.get("/getCustomer", authController.getCustomer);
router.post("/deleteItemCustom", authController.deleteItemCustom);
module.exports = router;
