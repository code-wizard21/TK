const express = require("express");
const router = express.Router();

const orderController = require("../../controller/orderController");

router.post("/customerRegister", orderController.Register);
router.post("/findAllCustom", orderController.findAllCustom);
router.post("/acceptedItemCustom", orderController.acceptedItemCustom);
router.post("/findAcceptCustom", orderController.findAcceptCustom);
router.post("/findallcustomreq", orderController.findallcustomreq);
router.post("/rejetedItemCustom", orderController.rejetedItemCustom);

module.exports = router;
