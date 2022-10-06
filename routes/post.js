const express = require("express");
const {
  allPosts,
  index,
  postData,
  singlePost,
  updatePost,
  deletePost,
} = require("../controls/postController");
const postRoutes = express.Router();
const { validateDescription } = require("../validation/validators");
const uploadImage = require("../middlewares/multer");

postRoutes.get("/allposts", allPosts);

postRoutes.get("/post", index);

postRoutes.get("/post/:id", singlePost);

postRoutes.post(
  "/post",
  uploadImage("posts").single("image"),
  validateDescription,
  postData
);

postRoutes.patch("/post/:id", validateDescription, updatePost);

postRoutes.delete("/post/:id", deletePost);

module.exports = postRoutes;
