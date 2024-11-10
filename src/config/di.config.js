const { createContainer, asValue, Lifetime, asFunction } = require("awilix");
const { handleError } = require("../utils");

const configureContainer = (models, sequelize) => {
  const container = createContainer();

  container.register({
    sequelize: asValue(sequelize),
    models: asValue(models),
    handleError: asFunction(() => handleError),
  });

  container.loadModules(
    ["src/services/*.js", "src/repositories/*.js", "src/controllers/*.js"],
    {
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
      formatName: "camelCase",
    }
  );

  return container;
};

module.exports = configureContainer;
