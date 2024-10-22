import express from "express";
import {
  getAllHouses,
  searchHouses,
  predictPrice,
} from "../controllers/houseController.js";
import House from "../models/House.js";

const router = express.Router();

// Route for searching houses based on NLP search
router.post("/search", searchHouses);

// Route for fetching a house by ID
router.get("/api/houses/:id", async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json(house);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route for getting all houses
router.get("/api/houses", getAllHouses);

// Route for predicting the price
router.post("/api/predict-price", predictPrice);

// Function to get related house designs based on price and area criteria
export const getRelatedDesigns = async (req, res) => {
  const { type, predictedPrice, area, landOptions } = req.body;

  const minPrice = predictedPrice - 500000; // ±5 lakhs
  const maxPrice = predictedPrice + 500000;
  const minArea = area - 200; // ±200 sqft
  const maxArea = area + 200;

  try {
    // Find houses matching the criteria
    const relatedHouses = await House.find({
      type,
      price: { $gte: minPrice, $lte: maxPrice },
      area: { $gte: minArea, $lte: maxArea },
      landOptions: landOptions, // exact match on land option
    });

    res.status(200).json(relatedHouses);
  } catch (error) {
    console.error("Error fetching related designs:", error);
    res.status(500).json({ error: "Error fetching related designs" });
  }
};

// Route for fetching related designs based on price, area, and land option
router.post("/api/related-designs", getRelatedDesigns);

export default router;
