const { Op } = require("sequelize");
const {
  STATUS_REJECTED,
  STATUS_REQUESTED,
  STATUS_ACCEPTED,
  STATUS_WASHED,
  STATUS_CANCELLED,
  STATUS_COMPLETED,
} = require("../constants");
const db = require("../models");
const Order = db.order;
exports.createOrder = (req, res) => {
  const neworder = {
    Company: req.body.name,
    LeadNumber: req.body.leadNumber,
    PupNumber: req.body.pupNumber,
    Description: req.body.description,
    Date: req.body.date,
    Status: STATUS_REQUESTED,
    Pickup: req.body.pickup,
    Drop: req.body.drop,
  };
  // Save Tutorial in the database
  Order.create(neworder)
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
  const status = req.params.status.split(",");
  const { company, from, to } = req.body;
  console.log(from, to);
  let qwhere = {
    Status: {
      [Op.or]: status
    },
  };
  if (company) qwhere.Company = company;
  if (from || to) qwhere[Op.and] = [];
  if (from) qwhere[Op.and].push({Date: { [Op.gte]: from}});
  if (to) qwhere[Op.and].push({Date: { [Op.lte]: to}});

  const orders = await Order.findAll({
    where: qwhere,
  });

  res.send(orders);
};
exports.accept = async (req, res) => {
  try {
    const user = await Order.update(
      { Status: STATUS_ACCEPTED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const orders = await Order.findAll({
      where: {
        Status: STATUS_REQUESTED,
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.reject = async (req, res) => {
  try {
    const order = await Order.update(
      { Status: STATUS_REJECTED, Reason: req.body.description },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const orders = await Order.findAll({
      where: {
        Status: STATUS_REQUESTED,
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.wash = async (req, res) => {
  try {
    const user = await Order.update(
      { Status: STATUS_WASHED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const orders = await Order.findAll({
      where: {
        Status: STATUS_ACCEPTED,
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.complete = async (req, res) => {
  try {
    const user = await Order.update(
      { Status: STATUS_COMPLETED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const orders = await Order.findAll({
      where: {
        Status: STATUS_WASHED,
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const user = await Order.update(
      { Status: STATUS_CANCELLED },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const orders = await Order.findAll({
      where: {
        Status: STATUS_REJECTED,
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateOrderByStatus = async (req, res) => {
  console.log(req.body);
  const status = req.params.status;

  const user = await Order.update(
    { Status: status, Date: req.body.date },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  const restore = await Order.findAll({
    where: {
      Status: STATUS_REJECTED,
    },
  });
  res.send(restore);
};
