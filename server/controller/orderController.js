const { STATUS_REJECTED, STATUS_REQUESTED, STATUS_ACCEPTED } = require("../constants");
const db = require("../models");
const Customerlist = db.customer;

exports.createOrder = (req, res) => {
  const userlist = {
    CustomerName: req.body.name,
    CarNumber: req.body.cardNum,
    Detail: req.body.detail,
    Date: req.body.date,
    State: "request",
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
  }
  if(company) qwhere.CustomerName = company;

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
