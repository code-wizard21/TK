module.exports = (sequelize, Sequelize) => {
  const PickupLocation = sequelize.define("pickup_location", {
    Name: {
      type: Sequelize.STRING,
    },
  });

  return PickupLocation;
};
