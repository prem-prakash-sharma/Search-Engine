const mongoose = require("mongoose");

// Define the schema for the "data" collection
const dataSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
});

// Create the "data" model with the schema
const Data = mongoose.model("data", dataSchema);

// Export the model
module.exports = Data;
