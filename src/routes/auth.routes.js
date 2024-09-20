const express = require("express");
const { validateBadRequest } = require("../middlewares/user.middleware");
const { registerValidator } = require("../validators/user.validator");
const router = express.Router();

router.post(
  "/register",
  validateBadRequest(registerValidator),
  (req, res, next) => {
    return req.container.resolve("userController").createUser(req, res, next);
  }
);
// router.post("/login", login);
// router.post("/logout", logout);

module.exports = router;
