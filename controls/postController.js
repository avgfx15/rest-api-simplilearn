const validationHandler = require("../validation/validationHandler");
const Post = require("../models/postModel");

exports.allPosts = async (req, res, next) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 10;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const posts = await Post.find()
      .skip((page - 1) * pagination)
      .limit(pagination)
      .populate("user");

    res.send(posts);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find({
      user: { $in: [...req.user.following, req.user.id] },
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.send(posts);
  } catch (error) {
    next(error);
  }
};

exports.singlePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id, {
      user: { $in: [...req.user.following, req.user.id] },
    }).populate("user");
    res.send(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    validationHandler(req);

    const post = await Post.findById(req.params.id);

    if (!post || post.user != req.user.id) {
      const error = await new Error("User not authenticate");
      error.statusCode = 400;
      throw error;
    }
    post.description = req.body.description;

    const savePost = await post.save();
    res.send(savePost);
  } catch (error) {
    next(error);
  }
};

exports.postData = async (req, res, next) => {
  try {
    validationHandler(req);

    const { description } = req.body;

    const post = new Post();
    post.description = description;
    post.user = req.user;
    post.image = req.file.filename;

    const savePost = await post.save();
    res.send(savePost);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user != req.user.id) {
      const error = await new Error("User not authenticate");
      error.statusCode = 400;
      throw error;
    }
    await post.delete();
    res.send({ message: "Post Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
