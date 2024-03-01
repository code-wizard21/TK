module.exports = (sequelize, Sequelize) => {
  const PickupLocation = sequelize.define("pickup_location", {
    PickName: {
      type: Sequelize.STRING,
    },
  });

  return PickupLocation;
};
