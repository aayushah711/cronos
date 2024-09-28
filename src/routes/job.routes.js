const express = require("express");
const { validateBadRequest } = require("../middlewares/user.middleware.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const { createJobValidator } = require("../validators/job.validator");
const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validateBadRequest(createJobValidator),
  (req, res, next) => {
    return req.container.resolve("jobController").createJob(req, res, next);
  }
);

module.exports = router;
