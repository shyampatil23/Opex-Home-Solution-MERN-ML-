import House from "../models/House.js";
import { execSync } from "child_process";
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
export const searchHouses = async (req, res) => {
  const { query } = req.body;
  const scriptPath = path.join(__dirname, "../../AI_ML/nlp_search.py");

  try {
    // Execute the Python script with the query as an argument
    const stdout = execSync(`python ${scriptPath} "${query}"`).toString();
    const searchResults = JSON.parse(stdout);

    // Fetch data for each search result from the database
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
        }
        return result;
      })
    );

    res.json(houseData);
  } catch (error) {
    console.error("Search execution or parsing error:", error);
    res.status(500).json({ message: "Search error", error: error.message });
  }
};

// Function to predict price
export const predictPrice = (req, res) => {
  const { name, area, landOptions } = req.body;
  const scriptPath = path.join(__dirname, "../../AI_ML/price_prediction.py");

  try {
    // Execute the Python script with parameters
    const stdout = execSync(
      `python ${scriptPath} "${name}" ${area} "${landOptions}"`
    ).toString();

    // Extract only the predicted price from the output
    const output = stdout.trim();
    const price = parseFloat(output.split(" ")[0]);

    // Validate the extracted price
    if (isNaN(price)) {
      return res
        .status(500)
        .json({
          error: "Invalid price format returned from prediction script",
        });
    }

    // Return the predicted price
    res.status(200).json({ price });
  } catch (error) {
    console.error("Error in price prediction:", error);
    res
      .status(500)
      .json({ error: "Error in price prediction", details: error.message });
  }
};
