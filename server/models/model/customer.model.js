module.exports = (sequelize, Sequelize) => {
  const Customerlist = sequelize.define("customer", {
    CustomerName: {
      type: Sequelize.STRING,
    },
    CarNumber: {
      type: Sequelize.STRING,
    },
    Detail: {
      type: Sequelize.STRING,
    },
    Date: {
      type: Sequelize.STRING,
    },
    State: {
      type: Sequelize.STRING,
    },
  });

  return Customerlist;
};
