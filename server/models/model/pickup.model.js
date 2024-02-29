module.exports = (sequelize, Sequelize) => {
  const PickupList = sequelize.define("pickup", {
    PickName: {
      type: Sequelize.STRING,
    },
  });

  return PickupList;
};
