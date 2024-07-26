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
  res.render("index.ejs");
});

// GET /dogs
app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  res.render("dogs/index.ejs", { dogs: allDogs });
});

//GET /dogs/new
app.get("/dogs/new", (req, res) => {
  res.render("dogs/new.ejs");
});

// GET /dogs/:dogId
app.get("/dogs/:dogId", async (req, res) => {
  const foundDog = await Dog.findById(req.params.dogId);
  res.render("dogs/show.ejs", { dog: foundDog });
});

// POST /dogs
app.post("/dogs", async (req, res) => {
  if (req.body.likesToPlay === "on") {
    req.body.likesToPlay = true;
  } else {
    req.body.likesToPlay = false;
  }
  await Dog.create(req.body);
  res.redirect("/dogs");
});


// LISTEN
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

