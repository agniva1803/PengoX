import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String, // ✅ include image field
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [itemSchema], required: true }, // ✅ use itemSchema here
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
