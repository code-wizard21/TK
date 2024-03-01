const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const User = db.user;
exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      where: { Email: req.body.Email },
    });
    if (!user) {
      return res.send({ error: "User not found", status: 400 });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!isPasswordValid) {
      return res.send({ error: "Invalid password", status: 400 });
    }
    const token = jwt.sign(
      {
        email: user.Email,
        birthday: user.Birthday,
        job: user.Job,
        name: user.Name,
      },
      "secret"
    );
    console.log("token", token);
    res.send({ token, status: 200 });
  } catch (err) {
    res.send({ error: err});
  }
};
