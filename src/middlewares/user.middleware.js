const validateBadRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message).join(", ") });
  }
  next();
};

module.exports = { validateBadRequest };
