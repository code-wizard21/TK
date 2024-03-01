const db = require("../models");
const Truck = db.truck;
exports.createTruck = async (req, res) => {
  console.log(req.body);
  // Create a trucklist
  try {
    console.log(req.body);
    const truck = await Truck.findOne({
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
    Truck.create(trucklist)
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
exports.getTrucks = async (req, res) => {
  const trucklist = await Truck.findAll({});
  //   console.log(trucklist[0].dataValues);
  res.send(trucklist);
};
exports.updateTrucks = async (req, res) => {
  const id = req.params.id;
  const { FirstNumber, SecondNumber, Company, Type } = req.body;
  try {
    const user = await Truck.update(
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
exports.deleteTruck = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Truck.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
