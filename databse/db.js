const mongoose = require("mongoose");

// Connect MongoDB at default port 27017.
const connectDB = mongoose.connect(
  "mongodb://localhost:27017/instagram-rest-api",
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

module.exports = connectDB;
