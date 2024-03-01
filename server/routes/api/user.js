const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");

//Admin CRUD
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/byrole/:role", userController.getUserByRole);
router.put("/:id", userController.updateByUser);

module.exports = router;
