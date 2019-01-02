const express = require("express");
const router = express.Router();
const { signup, signin } = require("../handlers/auth");

// If there is any post request to /signup or /signin run their functions
router.post("/signup", signup);
router.post("/signin", signin);

// then export out
module.exports = router;
