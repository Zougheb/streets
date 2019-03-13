const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/developer", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
