const Sequelize = require("sequelize");
const {
  user,
  password,
  host,
  port,
  database,
  dialect,
  pool,
} = require("../config.js");

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
  pool,
});

const db = {};

db.sequelize = sequelize;

db.userlist = require("./model/user.model.js")(sequelize, Sequelize);
db.customer = require("./model/customer.model.js")(sequelize, Sequelize);
db.washlist = require("./model/washer.model.js")(sequelize, Sequelize);
db.trucklist = require("./model/truck.model.js")(sequelize, Sequelize);
module.exports = db;
