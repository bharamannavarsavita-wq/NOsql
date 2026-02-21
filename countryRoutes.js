const express = require("express");
const axios = require("axios");
const Country = require("../models/Country");
const router = express.Router();

// Search country
router.get("/:name", async (req, res) => {
  try {
    const countryName = req.params.name;

    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
      
    );

    const data = response.data[0];

    const newCountry = new Country({
      name: data.name.common,
      capital: data.capital ? data.capital[0] : "N/A",
      population: data.population,
      region: data.region,
      flag: data.flags.png
    });

    await newCountry.save();

    res.json(newCountry);

  } catch (error) {
    res.status(500).json({
      message: "Country not found or API error",
      error: error.message
    });
  }
});

// Search history
router.get("/", async (req, res) => {
  const history = await Country.find()
    .sort({ searchedAt: -1 })
    .limit(10);

  res.json(history);
});

module.exports = router;