const { Pool } = require("pg");
const dbConfig = require("../config/db.config");

const pool = new Pool(dbConfig);

module.exports = pool;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "cronos",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
