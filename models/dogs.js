const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});