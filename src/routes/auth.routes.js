const express = require("express");
const router = express.Router();

router.post("/register", (req, res, next) => {
  return req.container.resolve("userController").createUser(req, res, next);
});
// router.post("/login", login);
// router.post("/logout", logout);

module.exports = router;
