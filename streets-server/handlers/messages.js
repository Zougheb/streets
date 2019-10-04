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
    console.log("print the message here", foundMessage)
    return res.status(200).json({ foundMessage, message: "You Just Created a message"});
  } catch (err) {
    return next(err);
  }
};


// GET - /api/users/:id/messages/:message_id
// exports.getAllMessages = async function(req, res, next) {
//   try {
//     let message = await db.Message.find(req.params.message_id);
//     return res.status(200).json(message);
//   } catch (err) {
//     return next(err);
//   }
// };

// GET - /api/users/:id/messages/:message_id
exports.getSingleMessage = async function(req, res, next){
  try {
    let singleMessage = await db.Message.findById(req.params.message_id)
    return res.status(200).json(
      {singleMessage, 
      "message": "sucessfully get a single message"}
      )
  } catch (error) {
    return next(err)
  }
}


exports.updateSingleMessage = async function (req, res, next) {
  try {
    let singleMessage = await db.Message.findById(req.params.message_id)
    await singleMessage.update();

    return res.status(200).json({ singleMessage, 
      "message": "sucessfully get a single message" 
    })
  } catch (error) {
    return next(error)
  }
}
// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();

    return res.status(200).json({foundMessage, message:"deleted"});
  } catch (err) {
    return next(err);
  }
};
