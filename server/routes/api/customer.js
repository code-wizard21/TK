const express = require("express");
const router = express.Router();

const cusController = require("../../controller/cusController");

router.post("/register", cusController.Register);
router.post("/findAllCustom", cusController.findAllCustom);
router.post("/deleteItemCustom", cusController.deleteItemCustom);
router.post("/acceptedItemCustom", cusController.acceptedItemCustom);
router.post("/findAcceptCustom", cusController.findAcceptCustom);
router.post("/findallcustomreq", cusController.findallcustomreq);
router.post("/rejetedItemCustom", cusController.rejetedItemCustom);

module.exports = router;
