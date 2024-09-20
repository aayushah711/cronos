const { asClass, createContainer, asValue, Lifetime } = require("awilix");
const Database = require("../utils/db");

const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");
const UserController = require("../controllers/user.controller");

const container = createContainer();

(async () => {
  const db = new Database();
  await db.initializeDatabase();
  const sequelize = db.getConnection();
  container.register({
    db: asValue(sequelize),
    userModel: asClass(sequelize.models.User),
    userRepository: asClass(UserRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
    userController: asClass(UserController, {
      lifetime: Lifetime.SINGLETON,
    }),
  });
})();
module.exports = container;
