const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const Userlist = db.userlist;
exports.signup = async (req, res) => {
  console.log("234234234");
  const { param } = req;
  console.log(param);
  console.log(req.body);
  // Create a Userlist
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userlist = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    Job: "customer",
    PhoneNumber: req.body.phone,
  };
  // Save Tutorial in the database
  Userlist.create(userlist)
    .then((data) => {
      // console.log(data.dataValues)

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userlist.",
      });
    });
};
exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    const user = await Userlist.findOne({
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
  } catch (err) {}
};
