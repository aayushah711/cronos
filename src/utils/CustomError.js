module.exports = class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Ensures the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Captures the stack trace (optional)
    Error.captureStackTrace(this, this.constructor);
  }
};
