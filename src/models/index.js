const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const sequelize = require("../utils/db.js");

const initializeModels = () => {
  const db = {};

  // Load each model file dynamically
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-9) === ".model.js"
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize); // Initialize model
      db[model.name] = model; // Add to the db object
    });

  //   // Define associations here
  //   const { User, Profile } = db;

  //   if (User && Profile) {
  //     User.hasOne(Profile, { foreignKey: "userId" });
  //     Profile.belongsTo(User, { foreignKey: "userId" });
  //   }

  db.sequelize = sequelize; // Add Sequelize instance to db object
  return db;
};

module.exports = initializeModels;
