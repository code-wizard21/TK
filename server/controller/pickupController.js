const db = require("../models");
const PickupLocation = db.pickup_location;

exports.getPickupLocations = async (req, res) => {
  const picklists = await PickupLocation.findAll({});
  res.status(200).json(picklists);
};
