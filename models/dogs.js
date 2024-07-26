const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  likesToPlay: Boolean,
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;