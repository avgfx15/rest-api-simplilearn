const { validationResult } = require("express-validator");

module.exports = (req) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.validation = validationError.array();
    throw error;
  }
};
