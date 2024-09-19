const { asClass, createContainer, asValue, Lifetime } = require("awilix");
const sequelize = require("../utils/db");

const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");
const UserController = require("../controllers/user.controller");

const container = createContainer();

container.register({
  db: asValue(sequelize),
  userRepository: asClass(UserRepository, {
    lifetime: Lifetime.SINGLETON,
  }),
  userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
  userController: asClass(UserController, {
    lifetime: Lifetime.SINGLETON,
  }),
});

module.exports = container;
