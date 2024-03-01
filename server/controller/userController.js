const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const User = db.user;

exports.getUserByRole = async (req, res) => {
  const { role } = req.params;
  const userlist = await User.findAll({
    where: {
      Job: role,
    },
  });
  res.send(userlist);
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userlist = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    PhoneNumber: req.body.phone,
    Job: req.body.role,
  };
  // Save Tutorial in the database
  User.create(userlist)
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
exports.updateByUser = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  try {
    const user = await User.update(
      {
        Email: req.body.email,
        PhoneNumber: req.body.phone,
        Name: req.body.name,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
