function handleError(res, error) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

function isValidCronCharacter(value) {
  if (value !== "*" && !Number.isInteger(Number(value))) {
    throw new Error('Minute must be an integer or "*"');
  }
}

module.exports = { handleError, isValidCronCharacter };
