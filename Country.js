const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: String,
  capital: String,
  population: Number,
  region: String,
  flag: String,
  searchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Country", countrySchema);