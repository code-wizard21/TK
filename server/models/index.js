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

db.user = require("./model/user.model.js")(sequelize, Sequelize);
db.order = require("./model/order.model.js")(sequelize, Sequelize);
db.truck = require("./model/truck.model.js")(sequelize, Sequelize);
db.pickup_location = require("./model/pickuplocation.model.js")(sequelize, Sequelize);
db.drop_location = require("./model/droplocation.model.js")(sequelize, Sequelize);
module.exports = db;
