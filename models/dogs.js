const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  highEnergy: Boolean,
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;