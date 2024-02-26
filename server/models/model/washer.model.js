module.exports = (sequelize, Sequelize) => {
    const Washlist = sequelize.define("washlist", {
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
  
    return Washlist;
  };
  