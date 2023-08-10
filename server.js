const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const connectToDatabase = require("./db.config");
const mongoose = require("mongoose");

// Define the schema for the "data" collection
const dataSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
});

// Create the "data" model with the schema
const Data = mongoose.model("data", dataSchema);

connectToDatabase();

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json());

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/search", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const results = await Data.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { url: { $regex: searchQuery, $options: "i" } },
      ],
    }).limit(20);

    res.render("pages/search", { results });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
