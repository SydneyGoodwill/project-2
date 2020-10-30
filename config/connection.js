/* eslint-disable prettier/prettier */
"use strict";

const Sequelize = require("sequelize");
const config = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
};

const sequelize = new Sequelize(config);

module.exports = sequelize;