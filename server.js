const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Dog = require("./models/dogs.js");
app.use(express.urlencoded({ extended: false }));

// GET /
app.get("/", async (req, res) => {
  res.send("hello, friend!");
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/dogs/new", (req, res) => {
  res.render("dogs/new.ejs");
});

// POST /
app.post("/dogs", async (req, res) => {
  console.log(req.body);
})


// LISTEN
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

