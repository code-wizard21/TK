module.exports = (sequelize, Sequelize) => {
  const DropdownList = sequelize.define("dropdown", {
    DropName: {
      type: Sequelize.STRING,
    },
  });

  return DropdownList;
};
