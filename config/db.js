const { Sequelize } = require("sequelize");

const createDB = new Sequelize("user-login", "skysparko", "Sequelize@125", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

module.exports = createDB;
