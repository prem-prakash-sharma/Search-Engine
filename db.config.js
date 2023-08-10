const mongoose = require("mongoose");
require("dotenv").config();

// Load the MongoDB URI from the environment variables
const dbUrl = process.env.MONGODB_URI;

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    // Connect to MongoDB using the provided URI
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connection successful, log a success message
    console.log("Connected to MongoDB database");

    // Return the connected mongoose instance
    return mongoose;
  } catch (error) {
    // Log an error message if the connection fails
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Export the connectToDatabase function
module.exports = connectToDatabase;
