const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

// Hashing the password before saving a user to the db
userSchema.pre("save", async function(next) {
  try {
    // check if the user didn't modify the password
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    // once it finished, set the PW prop on this doc to be that hashed PW
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Building the PW comparison function to compare the hashed pw with the the document password in the DB
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    // save the result of bycrypt.compare in a variable called isMatch
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

// create a user module
const User = mongoose.model("User", userSchema);

module.exports = User;
