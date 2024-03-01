var express = require("express");
var router = express.Router();

/* GET home page. */
router.use("/auth", require("../routes/api/auth"));
router.use("/truck", require("../routes/api/truck"));
router.use("/user", require("../routes/api/user"));
router.use("/order", require("../routes/api/order"));
router.use("/pickup_location", require("./api/pickup_location"));
router.use("/drop_location", require("./api/drop_location"));

module.exports = router;
