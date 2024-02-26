const express = require("express");
const router = express.Router();

const washController = require("../../controller/washController");

router.post("/register", washController.Register);
router.get("/getAllList", washController.getAllList);
router.post("/getAcceptList", washController.getAcceptList);
router.get("/getAllWashed", washController.getAllWashed);
router.post("/setSelectWashed", washController.setSelectWashed);
router.get("/getWasher", washController.getWasher);
router.post("/deleteItemWasher", washController.deleteItemWasher);
router.get("/getWasherlist", washController.getWasherlist);

module.exports = router;
