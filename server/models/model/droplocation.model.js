module.exports = (sequelize, Sequelize) => {
  const DropLocation = sequelize.define("drop_location", {
    DropName: {
      type: Sequelize.STRING,
    },
  });

  return DropLocation;
};
