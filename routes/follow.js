const express = require("express");
const followRouter = express.Router();
const { follow } = require("../controls/followController");

followRouter.post("/follow/:id", follow);

module.exports = followRouter;
