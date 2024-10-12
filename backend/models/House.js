import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desp: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  material: { type: String, required: true },
  landOptions: {
    type: [String],
    default: [], 
  },
  contractor: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
  images: {
    exterior: [String],
    interior: [String],
    plan: [String],
  },
});

const House = mongoose.model("House", houseSchema);
export default House;
