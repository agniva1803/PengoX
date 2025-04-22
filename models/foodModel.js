import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // Stores image path relative to uploads directory
  category: { type: String, required: true },
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model("Food", foodSchema);
export default foodModel;

