module.exports = (sequelize, Sequelize) => {
  const Trucklist = sequelize.define("trucklist", {
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

  return Trucklist;
};
