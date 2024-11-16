const express = require("express");
const http = require("http");
const configureContainer = require("./src/config/di.config");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./src/routes/auth.routes");
const jobRoutes = require("./src/routes/job.routes");
const initializeModels = require("./src/models");
const sequelize = require("./src/utils/db");

const createServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.json());
  const models = await initializeModels();

  const container = configureContainer(models, sequelize);
  // Call checkJobs function here
  container.cradle.jobSchedulerService.checkJobsAndAddToQueue();

  app.use((req, res, next) => {
    req.container = container;
    next();
  });
  app.use("/auth", authRoutes);
  app.use("/jobs", jobRoutes);

  const server = http.createServer(app);

  server.on("close", () => container.dispose());
  return server;
};

async function main() {
  const server = await createServer();
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
main();
