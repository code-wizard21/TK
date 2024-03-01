module.exports = (sequelize, Sequelize) => {
  const DropLocation = sequelize.define("drop_location", {
    Name: {
      type: Sequelize.STRING,
    },
  });

  return DropLocation;
};
