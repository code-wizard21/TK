const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const Userlist = db.userlist;
const Customerlist = db.customer;

exports.getUserByRole = async (req, res) => {
  const { role } = req.params;
  const userlist = await Userlist.findAll({
    where: {
      Job: role,
    },
  });
  res.send(userlist);
};

exports.authUpdate = async (req, res) => {
  const id = req.body.id;
  const { Name, Email } = req.body;

  try {
    const user = await Userlist.update(
      { Name, Email },
      {
        where: {
          id: id,
        },
      }
    );
    // const tablelist = await Userlist.findAll({});
    // console.log(tablelist)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Userlist.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteItemCustom = async (req, res) => {
  console.log(req.body);

  const id = req.body.id;
  try {
    const user = await Userlist.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllWashed = async (req, res) => {
  const customerlist = await Customerlist.findAll({
    where: {
      State: "washed",
    },
  });
  // console.log("washed",customerlist)
  res.send(customerlist);
};
exports.getAllAccepted = async (req, res) => {
  const customerlist = await Customerlist.findAll({
    where: {
      State: "accepted",
    },
  });

  res.send(customerlist);
};
exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userlist = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    PhoneNumber: req.body.number,
    Job: req.body.role
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
exports.getAllWasherList = async (req, res) => {
  console.log(req.body);
  const customerlist = await Customerlist.findAll({
    where: {
      State: "request",
    },
  });
  res.send(customerlist);
};
exports.setSelectWashed = async (req, res) => {
  console.log("1221212121", req.body);
  try {
    const user = await Customerlist.update(
      { State: "washed" },
      {
        where: {
          CarNumber: req.body.id,
        },
      }
    );
    const customerlist = await Customerlist.findAll({
      where: {
        State: "request",
      },
    });
    // console.log(customerlist);
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
