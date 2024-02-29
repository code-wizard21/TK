var express = require("express");
var router = express.Router();

/* GET home page. */
router.use("/auth", require("../routes/api/auth"));
router.use("/truck", require("../routes/api/truck"));
router.use("/user", require("../routes/api/user"));

module.exports = router;
