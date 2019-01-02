const db = require("../models");

exports.createMessage = async function(req, res, next) {
  try {
    // create a message with passing 2 props a text and the user ID
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    // then find that specific user
    let foundUser = await db.User.findById(req.params.id);
    // add the message property on to that user
    foundUser.messages.push(message.id);
    // then save the user
    await foundUser.save();
    // once saved, send back the msg with the user data as well
    let foundMessage = await db.Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

// GET - /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
  try {
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();

    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
