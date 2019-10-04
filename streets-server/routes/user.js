const express = require("express");
const router = express.Router({ mergeParams: true });
const { getUser } = require("../handlers/user_profile");


// prefix - /api/users/:user_id
router
    .route("/:user_id")
    .get(getUser)

module.exports = router;