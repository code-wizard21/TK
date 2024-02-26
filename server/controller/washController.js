const db = require("../models");
const bcrypt = require("bcrypt");
const Customerlist = db.customer;
const Userlist = db.userlist;
exports.Register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userlist = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    Job: "washer",
    PhoneNumber: req.body.number,
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
exports.getAllList = async (req, res) => {
  console.log(req.body);
  const customerlist = await Customerlist.findAll({
    where: {
      State: "request",
    },
  });
  res.send(customerlist);
};
exports.getAcceptList = async (req, res) => {
  console.log("2322322323");
  console.log(req.body);
  const customerlist = await Customerlist.findAll({
    where: {
      State: "accepted",
    },
  });
  res.send(customerlist);
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
exports.getWasher = async (req, res) => {
  const washer = await Userlist.findAll({
    where: {
      Job: "washer",
    },
  });
  res.send(washer);
};
exports.deleteItemWasher = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await Userlist.destroy({
      where: {
        PhoneNumber: id,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getWasherlist =async (req,res) =>{
  const customer = await Userlist.findAll({
    where: {
      Job: "washer",
    },
  });
  res.send(customer);
}