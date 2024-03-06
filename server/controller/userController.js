const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const User = db.user;
const {
  STATUS_REJECTED,
  STATUS_REQUESTED,
  STATUS_ACCEPTED,
  STATUS_WASHED,
  STATUS_DISABLED,
} = require("../constants");
exports.getUserByRole = async (req, res) => {
  const { role } = req.params;
  const userlist = await User.findAll({
    where: {
      Job: role,
    },
    order: [["id", "asc"]],
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
    State: "Enable",
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
  let data = {
    Email: req.body.email,
    PhoneNumber: req.body.phone,
    Name: req.body.name,
  };
  if(req.body.password) data.Password = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.update(
      data,
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
exports.updateByUserDisabled = async (req, res) => {
  console.log("121212121", req.body.id);
  const user = await User.update(
    { State: "Disabled" },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.status(200).json(user);
};
exports.updateByUserEnabled = async (req, res) => {
  console.log("121212121", req.body.id);
  const user = await User.update(
    { State: "Enabled" },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.status(200).json(user);
};
