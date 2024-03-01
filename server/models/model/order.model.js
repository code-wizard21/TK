module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    Company: {
      type: Sequelize.STRING,
    },
    LeadNumber: {
      type: Sequelize.STRING,
    },
    PupNumber: {
      type: Sequelize.STRING,
    },
    Description: {
      type: Sequelize.STRING,
    },
    Pickup: {
      type: Sequelize.STRING,
    },
    Drop: {
      type: Sequelize.STRING,
    },
    Date: {
      type: Sequelize.STRING,
    },
    Status: {
      type: Sequelize.STRING,
    },
    Reason: {
      type: Sequelize.STRING,
    },
  });

  return Order;
};
