import House from "../models/House.js";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to get all houses
export const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to search houses
export const searchHouses = (req, res) => {
  const { query } = req.body;

  // Define the Python script path
  const scriptPath = path.join(__dirname, "../../AI_ML/nlp_search.py");

  // Execute the Python script with the query as an argument
  exec(`python ${scriptPath} "${query}"`, async (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(
        `Error executing Python script: ${error?.message || stderr}`
      );
      return res.status(500).json({ message: "Search error" });
    }

    try {
      const searchResults = JSON.parse(stdout);

      const houseData = await Promise.all(
        searchResults.map(async (result) => {
          const house = await House.findById(result._id);

          if (house) {
            return {
              ...result,
              images: house.images,
              desp: house.desp,
              price: house.price,
              area: house.area,
              material: house.material,
              landOptions: house.landOptions,
              contractor: house.contractor,
              type: house.type,
            };
          } else {
            return result;
          }
        })
      );

      res.json(houseData);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      res.status(500).json({ message: "Failed to parse search results" });
    }
  });
};

// Function to predict price
export const predictPrice = (req, res) => {
  const { name, area, landOptions } = req.body;

  // Define the Python script path
  const scriptPath = path.join(__dirname, "../../AI_ML/price_prediction.py");

  // Execute the Python script with parameters
  exec(
    `python ${scriptPath} "${name}" ${area} "${landOptions}"`,
    (error, stdout, stderr) => {
      if (error || stderr) {
        console.error("Error in price prediction:", error || stderr);
        return res.status(500).json({ error: "Error in price prediction" });
      }

      // Extract only the predicted price from the output
      const output = stdout.trim();
      const price = parseFloat(output.split(" ")[0]); // Assuming price is the first part of the output

      // Return the predicted price
      res.status(200).json({ price });
    }
  );
};
