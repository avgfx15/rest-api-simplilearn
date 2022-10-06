const { body } = require("express-validator");

exports.validateDescription = body("description")
  .isLength({ min: 5 })
  .withMessage("Description is required and min length 5 characters");

exports.validateName = body("name")
  .isLength({ min: 5 })
  .withMessage("Name is required and must be 5 character long");

exports.validateEmail = body("email")
  .isEmail()
  .withMessage("Email is required");
exports.validatePassword = body("password")
  .exists()
  .withMessage("Password must required");
