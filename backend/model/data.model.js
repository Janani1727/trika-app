const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true }
  
});

const DataModel = mongoose.model("data", dataSchema);

module.exports = { DataModel };
