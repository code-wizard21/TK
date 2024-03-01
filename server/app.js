const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const pg = require("pg");
const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const Sequelize = require("sequelize");
const {
  user,
  password,
  host,
  port,
  database,
  dialect,
  pool,
} = require("./config.js");

app.use("/api", indexRouter);
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
  pool,
});

sequelize
  .authenticate()
  .then(() =>
    console.log("Successfully connected to PostgreSQL database using Sequelize")
  )
  .catch((error) => console.log("Unable to connect to the database:", error));

const pt = process.env.PORT || 5000;

app.listen(pt, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;
