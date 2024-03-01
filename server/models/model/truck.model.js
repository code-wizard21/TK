module.exports = (sequelize, Sequelize) => {
  const Truck = sequelize.define("truck", {
    FirstNumber: {
      type: Sequelize.STRING,
    },
    SecondNumber: {
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
