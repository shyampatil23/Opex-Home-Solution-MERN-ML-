import AWS from "aws-sdk";
import mongoose from "mongoose";
import { generateRandomHouseData } from "./dataGenerator.js";
import House from "../models/House.js";

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to list all folders in the S3 bucket
async function listS3Folders(bucketName) {
  const params = {
    Bucket: bucketName,
    Delimiter: "/",
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    console.log("List of folders:", data.CommonPrefixes); // Debugging log
    return data.CommonPrefixes.map((prefix) => prefix.Prefix); // Folder names
  } catch (error) {
    console.error("Error listing S3 folders:", error);
  }
}

// Function to get all image URLs from a specific folder
async function getImageUrls(bucketName, folderName) {
  const params = {
    Bucket: bucketName,
    Prefix: folderName, // Folder path (e.g., Building_10000/exterior/)
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    console.log(`Images in folder ${folderName}:`, data.Contents); // Debugging log
    return data.Contents.map(
      (file) =>
        `https://${bucketName}.s3.${"ap-south-1"}.amazonaws.com/${file.Key}`
    );
  } catch (error) {
    console.error("Error getting images from S3:", error);
    return []; // Return an empty array if there's an error or no images found
  }
}

// Convert price from string or number (e.g., "₹ 40 lakhs" or 35) to a number (e.g., 4000000)
function convertPriceToNumber(priceString) {
  if (typeof priceString !== "string") {
    return priceString; // If already a number, return it as-is
  }

  const priceNumber = parseFloat(priceString.replace(/[^0-9.]/g, ""));
  return priceString.toLowerCase().includes("lakh")
    ? priceNumber * 100000
    : priceNumber * 10000000;
}

// Convert area from string or number (e.g., "1700 sq ft" or 1700) to a number (e.g., 1700)
function convertAreaToNumber(areaString) {
  if (typeof areaString !== "string") {
    return areaString; // If already a number, return it as-is
  }

  return parseInt(areaString.replace(/[^0-9]/g, ""), 10);
}

// Function to assign landOptions based on folder type
function assignLandOptions(folderType) {
  const ruralTypes = [
    "Bungalow",
    "Bunglow",
    "Villa",
    "Farmhouse",
    "Cape Cod",
    "Colonial",
    "House",
    "Cottage",
  ];
  const suburbanTypes = [
    "Bungalow",
    "Bunglow",
    "Villa",
    "Studio",
    "Bookstore",
    "Store",
    "Shop",
    "Cafe",
    "Caffe",
    "Bakery",
    "Building",
    "Hotel",
    "Apartment",
    "Bank",
  ];
  const urbanTypes = [
    "Office",
    "Office_building",
    "Complex",
    "Cafe",
    "Caffe",
    "Building",
    "Hotel",
    "Commercial_building",
    "Center",
    "Apartment",
    "Bank",
    "Headquarters",
    "Factory",
    "Industry",
    "Penthouse",
  ];

  if (ruralTypes.includes(folderType)) {
    return "Rural";
  } else if (suburbanTypes.includes(folderType)) {
    return "Suburban";
  } else if (urbanTypes.includes(folderType)) {
    return "Urban";
  } else {
    return "Urban"; // Default if no match found
  }
}

// Populate MongoDB for all folders
async function populateMongoDB() {
  const bucketName = "house-designs-data"; // Your bucket name
  const folders = await listS3Folders(bucketName); // List all folder names

  let previousHouseData = null; // Initialize previousHouseData

  for (const folder of folders) {
    const folderType = folder.split("_")[0]; // Assuming folder names are like Building_10000

    // Generate unique house data for this folder using previous data for correlation
    const houseData = generateRandomHouseData(folderType, previousHouseData ? previousHouseData : { price: 30, area: 1500 }, 1)[0];

    // Fetch image URLs for exterior, interior, and plan
    const exteriorImages = await getImageUrls(bucketName, `${folder}exterior/`);
    const interiorImages = await getImageUrls(bucketName, `${folder}interior/`);
    const planImages = await getImageUrls(bucketName, `${folder}plan/`);

    // Log what images were found (debugging)
    console.log(`Exterior images for ${folder}:`, exteriorImages);
    console.log(`Interior images for ${folder}:`, interiorImages);
    console.log(`Plan images for ${folder}:`, planImages);

    // Convert price and area
    const priceNumber = convertPriceToNumber(houseData.price);
    const areaNumber = convertAreaToNumber(houseData.area);

    // Assign land options based on the folder type
    const landOptions = assignLandOptions(folderType);

    // Create a new house object with all details
    const newHouse = new House({
      name: houseData.name,
      img: exteriorImages[0] || "", // First exterior image as the main image
      desp: houseData.desp,
      price: priceNumber, // Store as a number
      area: areaNumber, // Store as a number
      material: houseData.material,
      type: folderType, // Store the type derived from folder name
      landOptions: landOptions, // Dynamically assigned land options
      contractor: houseData.contractor,
      images: {
        exterior: exteriorImages,
        interior: interiorImages,
        plan: planImages,
      },
    });

    // Save the house to MongoDB
    await newHouse.save();
    console.log(`Saved house: ${newHouse.name}`);

    // Update previousHouseData for the next iteration
    previousHouseData = houseData; // Set previousHouseData to the current house
  }
}

// Connect to MongoDB and run the population script
async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/opex_home_solutions", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await populateMongoDB();

    console.log("All house data has been populated.");
  } catch (error) {
    console.error("Error populating data:", error);
  } finally {
    mongoose.connection.close();
  }
}

run();
