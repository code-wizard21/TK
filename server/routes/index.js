var express = require("express");
var router = express.Router();

/* GET home page. */
router.use("/auth", require("../routes/api/auth"));
router.use("/cus", require("../routes/api/customer"));
router.use("/wash", require("../routes/api/washer"));
router.use("/driv", require("../routes/api/driver"));


module.exports = router;
