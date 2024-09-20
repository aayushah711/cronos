const express = require("express");
const { validateBadRequest } = require("../middlewares/user.middleware");
const authenticateToken = require("../middlewares/auth.middleware.js");
const {
  registerValidator,
  loginValidator,
} = require("../validators/user.validator");
const router = express.Router();

router.post(
  "/register",
  validateBadRequest(registerValidator),
  (req, res, next) => {
    return req.container.resolve("userController").createUser(req, res, next);
  }
);

router.post("/login", validateBadRequest(loginValidator), (req, res, next) => {
  return req.container.resolve("userController").loginUser(req, res, next);
});

router.post("/logout", authenticateToken, (req, res, next) => {
  return req.container.resolve("userController").logoutUser(req, res, next);
});

module.exports = router;
