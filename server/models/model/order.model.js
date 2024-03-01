module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    CompanyName: {
      type: Sequelize.STRING,
    },
    CarNumber: {
      type: Sequelize.STRING,
    },
    Detail: {
      type: Sequelize.STRING,
    },
    PicksName: {
      type: Sequelize.STRING,
    },
    DropsName: {
      type: Sequelize.STRING,
    },
    Date: {
      type: Sequelize.STRING,
    },
    State: {
      type: Sequelize.STRING,
    },
  });

  return Order;
};
