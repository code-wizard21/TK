const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");

//Admin CRUD

router.delete("/:id", userController.deleteUser);
router.get("/byrole/:role", userController.getUserByRole);
router.get("/allWashed", userController.getAllWashed);
router.get("/allAccepted", userController.getAllAccepted);

//Driver API Implemented

router.post("/", userController.createUser);

//Washer API Implemented

router.get("/allList", userController.getAllWasherList);
router.post("/setSelectWashed", userController.setSelectWashed);

module.exports = router;
