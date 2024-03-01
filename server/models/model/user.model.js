module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    Name: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    PhoneNumber: {
      type: Sequelize.STRING,
    },
    Job: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
