const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = process.env.db;

if (!dbURI) {
  console.error("Database URI not found in environment variables!");
} else {
  console.log("Connecting to database...");
}

const connection = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

module.exports = { connection };
