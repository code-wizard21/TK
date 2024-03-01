const express = require("express");
const router = express.Router();

const orderController = require("../../controller/orderController");

router.post("/", orderController.createOrder);
router.get("/bystatus/:status", orderController.getOrderByStatus);
// router.delete("/:id", orderController.deleteOrder);
router.post("/accept", orderController.accept);
router.post("/reject", orderController.reject);
router.post("/wash", orderController.wash);
router.get("/bylocation", orderController.getOrderByLocation);

module.exports = router;
