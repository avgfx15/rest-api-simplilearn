const express = require("express");
const authRouter = express.Router();
const {
  allUsers,
  loginUser,
  signupUser,
  me,
} = require("../controls/authController");
const passportJWT = require("../middlewares/passportJWT")();
const {
  validateEmail,
  validatePassword,
  validateName,
} = require("../validation/validators");

authRouter.get("/allusers", allUsers);

authRouter.post("/login", loginUser);

authRouter.post(
  "/signup",
  [validateName, validateEmail, validateEmail],
  signupUser
);

module.exports = authRouter;

authRouter.get("/me", passportJWT.authenticate(), me);
