module.exports = (sequelize, Sequelize) => {
  const Truck = sequelize.define("truck", {
    LeadNumber: {
      type: Sequelize.STRING,
    },
    PupNumber: {
      type: Sequelize.STRING,
    },
    Company: {
      type: Sequelize.STRING,
    },
    Type: {
      type: Sequelize.STRING,
    },
  });

  return Truck;
};
