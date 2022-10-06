const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/userModel");
const validationHandler = require("../validation/validationHandler");

exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await user.validPassword(password);

    if (!validPassword) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.signupUser = async (req, res, next) => {
  try {
    validationHandler(req);

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      const error = new Error("User already exist");
      error.statusCode = 403;
      throw error;
    }

    let user = new User();
    (user.name = req.body.name),
      (user.email = req.body.email),
      (user.password = await user.encryptPassword(req.body.password));

    user = await user.save();

    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    return res.send({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  console.warn("My personal data");
  try {
    const user = await User.findById(req.user);
    return res.send(user);
  } catch (error) {
    next(error);
  }
};
