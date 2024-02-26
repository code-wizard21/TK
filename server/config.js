module.exports = {
  user: "postgres",
  password: "skystar5",
  database: "truck",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
