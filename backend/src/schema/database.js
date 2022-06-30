const mongoose = require("mongoose");

const files = new mongoose.Schema({
  name: String,
  idName: String,
  description: String,
});

const dbFiles = mongoose.model("files", files);

module.exports = { dbFiles };
