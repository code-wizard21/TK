const express = require("express");
const router = express.Router();

const orderController = require("../../controller/orderController");

router.post("/", orderController.createOrder);
router.post("/bystatus/:status", orderController.getOrderByStatus);
// router.delete("/:id", orderController.deleteOrder);
router.post("/accept", orderController.accept);
router.post("/reject", orderController.reject);
router.post("/wash", orderController.wash);
router.post("/cancel", orderController.cancel);
router.post("/complete", orderController.complete);
router.put("/bystatus/:status", orderController.updateOrderByStatus);

module.exports = router;
