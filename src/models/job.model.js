const { DataTypes, Model } = require("sequelize");
const { jobTypes } = require("../constants");
const { isValidCronCharacter } = require("../utils");

const Job = (sequelize) => {
  class Job extends Model {}
  Job.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      command: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: jobTypes,
        allowNull: false,
      },
      minute: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            return isValidCronCharacter(value);
          },
        },
      },
      hour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            return isValidCronCharacter(value);
          },
        },
      },
      dayOfMonth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            return isValidCronCharacter(value);
          },
        },
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            return isValidCronCharacter(value);
          },
        },
      },
      dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            return isValidCronCharacter(value);
          },
        },
      },
      timezoneOffsetMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      retries: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { sequelize, modelName: "Job", tableName: "Jobs" }
  );
  return Job;
};

module.exports = Job;
