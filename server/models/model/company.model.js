module.exports = (sequelize, Sequelize) => {
  const Companylist = sequelize.define("company", {
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

  return Companylist;
};
