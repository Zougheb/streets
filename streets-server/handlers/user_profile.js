const db =require("../models")



// GET - /api/users/:user_id
exports.getUser = async function (req, res, next) {
    try {
         let user = await db.User.findById(req.params.user_id)
        return res.status(200).json({user, "message" : "user info retrieved"});
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};