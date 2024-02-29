const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");

//Admin CRUD

router.delete("/delete/:id", userController.authDelete);
router.get("/:state", userController.getCustomer);
router.get("/allWashed", userController.getAllWashed);
router.get("/allAccepted", userController.getAllAccepted);

//Driver API Implemented

router.post("/driverRegister", userController.driverRegister);

//Washer API Implemented

router.post("/washerRegister", userController.washerRegister);
router.get("/allList", userController.getAllWasherList);
router.post("/setSelectWashed", userController.setSelectWashed);

module.exports = router;
