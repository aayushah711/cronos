const {
  asClass,
  createContainer,
  asValue,
  Lifetime,
  asFunction,
} = require("awilix");
const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");
const UserController = require("../controllers/user.controller");
const handleError = require("../utils/handleError");

const configureContainer = (models, sequelize) => {
  const container = createContainer();

  container.register({
    sequelize: asValue(sequelize),
    models: asValue(models),
    userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
    userRepository: asClass(UserRepository, { lifetime: Lifetime.SINGLETON }),
    userController: asClass(UserController, { lifetime: Lifetime.SINGLETON }),
    handleError: asFunction(() => handleError),
  });

  return container;
};

module.exports = configureContainer;
