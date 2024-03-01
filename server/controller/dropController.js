const db = require("../models");
const DropLocation = db.drop_location;

exports.getDropLocations = async (req, res) => {
  const droplists = await DropLocation.findAll({});
  res.status(200).json(droplists);
};
