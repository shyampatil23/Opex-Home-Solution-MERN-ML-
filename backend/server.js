// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import House from "./models/House.js";
import houseRoutes from "./routes/houses.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
  })
);
app.use(express.json());

app.use(houseRoutes);

// Basic route to check if the backend is working
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Connect to MongoDB using the .env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected to opex_home_solutions");
});

// Fetch all houses (optional if already handled in the routes)
app.get("/api/houses", async (req, res) => {
  try {
    const houses = await House.find(); // Fetch all house documents from MongoDB
    res.json(houses); // Send the fetched houses as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
