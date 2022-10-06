const User = require("../models/userModel");
const Post = require("../models/postModel");

exports.follow = async (req, res, next) => {
  try {
    req.user.following.push(req.params.id);
    req.user.save();
    res.send({ message: "Successfully Following" });
  } catch (error) {
    next(error);
  }
};
