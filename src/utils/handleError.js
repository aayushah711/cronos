function handleError(res, error) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

module.exports = handleError;
