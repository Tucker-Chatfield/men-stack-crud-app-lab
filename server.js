const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Imports the Dog model
const Dog = require("./models/dogs.js");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')))

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
  if (req.body.highEnergy === "on") {
    req.body.highEnergy = true;
  } else {
    req.body.highEnergy = false;
  }

  await Dog.create(req.body);
  res.redirect("/dogs");
});

// DELETE /dogs/dogId
app.delete("/dogs/:dogId", async (req, res) => {
  await Dog.findByIdAndDelete(req.params.dogId);
  res.redirect("/dogs");
});

// GET /dogs/dogId/edit
app.get('/dogs/:dogId/edit', async (req, res) => {
  const foundDog = await Dog.findById(req.params.dogId);
  res.render('dogs/edit.ejs', { dog: foundDog });
});

// PUT
app.put('/dogs/:dogId', async (req, res) => {
  if (req.body.highEnergy === "on") {
    req.body.highEnergy = true;
  } else {
    req.body.highEnergy = false;
  }

  await Dog.findByIdAndUpdate(req.params.dogId, req.body);
  res.redirect(`/dogs/${req.params.dogId}`);
})

// LISTEN
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

