const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcryptjs");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

userSchema.methods.validPassword = async function (candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log(true);
  return result;
};
//Export the model
module.exports = User = mongoose.model("User", userSchema);
