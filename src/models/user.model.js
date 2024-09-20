const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.js");

const User = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "User", tableName: "Users" }
  );
  return User;
};

module.exports = User;
