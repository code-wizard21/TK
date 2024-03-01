const {
  STATUS_REJECTED,
  STATUS_REQUESTED,
  STATUS_ACCEPTED,
  STATUS_WASHED,
} = require("../constants");
const db = require("../models");
const Customerlist = db.company;
const DropList = db.droplist;
const PickList = db.picklist;
exports.createOrder = (req, res) => {
  console.log(req.body);
  const userlist = {
    CompanyName: req.body.name,
    CarNumber: req.body.cardNum,
    Detail: req.body.detail,
    Date: req.body.date,
    State: STATUS_REQUESTED,
    PicksName: req.body.pick,
    DropsName: req.body.drop,
  };
  // Save Tutorial in the database
  Customerlist.create(userlist)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userlist.",
      });
    });
};

// exports.deleteOrder = (req, res) => {
//   const id = req.params.id;
//   // Save Tutorial in the database
//   Customerlist.destroy({
//     where: {
//       id: id,
//     },
//   })
//   .then((data) => {
//     res.status(200).send({ data });
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating the userlist.",
//     });
//   });
// };

exports.getOrderByStatus = async (req, res) => {
  const status = req.params.status;
  const company = req.body.company;
  let qwhere = {
    State: status,
  };
  if (company) qwhere.CustomerName = company;

  const customerlist = await Customerlist.findAll({
    where: qwhere,
  });

  res.send(customerlist);
};
exports.accept = async (req, res) => {
  try {
    const user = await Customerlist.update(
      { State: STATUS_ACCEPTED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const customerlist = await Customerlist.findAll({
      where: {
        State: STATUS_REQUESTED,
      },
    });
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.reject = async (req, res) => {
  try {
    const user = await Customerlist.update(
      { State: STATUS_REJECTED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const customerlist = await Customerlist.findAll({
      where: {
        State: STATUS_REQUESTED,
      },
    });
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.wash = async (req, res) => {
  try {
    const user = await Customerlist.update(
      { State: STATUS_WASHED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const customerlist = await Customerlist.findAll({
      where: {
        State: STATUS_ACCEPTED,
      },
    });
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getOrderByLocation = async (req, res) => {
  const droplists = await DropList.findAll({});
  const picklists = await PickList.findAll({});
  res.status(200).json({ pick: picklists, drop: droplists });
};
