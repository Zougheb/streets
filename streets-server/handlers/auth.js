const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    // finding a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    // Destructure some properties from the user
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    // checking if their Password matches what we sent to the server
    if (isMatch) {
      // will make the token
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch (e) {
    return next({ status: 400, message: "Invalid Email/Password." });
  }
};

exports.signup = async function(req, res, next) {
  try {
    // create a user using the user model
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    // create a token(signing a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      // after siging in that object, pass the secret key
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // if the validation fails
    if (err.code === 11000) {
      // respond with this msg
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
