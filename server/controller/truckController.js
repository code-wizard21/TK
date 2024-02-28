const db = require("../models");
const Trucklist = db.trucklist;
exports.register = async (req, res) => {
  console.log(req.body);
  // Create a trucklist
  try {
    console.log(req.body);
    const truck = await Trucklist.findOne({
      where: { FirstNumber: req.body.FirstNumber },
    });
    if (truck) {
      return res.send({
        data: "Truck number is already existed",
        status: 400,
      });
    }
    const trucklist = {
      FirstNumber: req.body.FirstNumber,
      SecondNumber: req.body.SecondNumber,
      Company: req.body.Company,
      Type: req.body.Type,
    };
    // Save Tutorial in the database
    Trucklist.create(trucklist)
      .then((data) => {
        // console.log(data);
        // res.status(200);
        return res.send({
          data: data.dataValues,
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the trucklist.",
        });
      });
  } catch (err) {
    console.log(err);
  }
};
exports.getTruckList = async (req, res) => {
  const trucklist = await Trucklist.findAll({});
  //   console.log(trucklist[0].dataValues);
  res.send(trucklist);
};
exports.updateTruckList = async (req, res) => {
  const id = req.body.id;
  const { FirstNumber, SecondNumber, Company, Type } = req.body;
  try {
    const user = await Trucklist.update(
      { FirstNumber, SecondNumber, Company, Type },

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
exports.deleteTruckList = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await Trucklist.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
