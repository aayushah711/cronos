const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

class Database {
  constructor() {
    this.db = new Sequelize(
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
  }

  getConnection() {
    // if (!this.db) {
    //   this.db = new Sequelize(
    //     process.env.DB_NAME || "cronos",
    //     process.env.DB_USER || "postgres",
    //     process.env.DB_PASSWORD || "password",
    //     {
    //       host: process.env.DB_HOST || "localhost",
    //       port: Number(process.env.DB_PORT) || 5432,
    //       dialect: "postgres",
    //       logging: false,
    //     }
    //   );
    // }
    return this.db;
  }

  async initializeDatabase() {
    try {
      if (!this.db) throw new Error("Database connection not established");
      await this.db.authenticate();
      console.log("Connection has been established successfully.");
      const db = {};

      const modelsDir = path.join(__dirname, "../models");
      fs.readdirSync(modelsDir)
        .filter((file) => {
          return file.indexOf(".") !== 0 && file.slice(-9) === ".model.js";
        })
        .forEach((file) => {
          const model = require(path.join(modelsDir, file))(this.db, DataTypes);
          db[model.name] = model;
        });

      Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
          db[modelName].associate(db); // Calls the associate function
        }
      });

      await this.db.sync();
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = Database;
