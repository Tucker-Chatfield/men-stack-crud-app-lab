const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

const Dog = mongoose.model("Fruit", dogSchema);

module.exports = Dog;