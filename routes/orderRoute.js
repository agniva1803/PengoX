import express from "express";
import Order from "../models/orderModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PLACE ORDER
router.post("/place", authMiddleware, async (req, res) => {
  try {
    const { cartItems, totalAmount, address, paymentIntentId, userId } = req.body;

    const orderItems = cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image, // Example: "/uploads/image.jpg"
    }));

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      address,
      paymentIntentId,
      status: "Processing",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// LIST ALL ORDERS (Admin)
router.get("/listorders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// GET USER ORDERS
router.get("/myorders", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const userOrders = await Order.find({ user: userId });
    res.status(200).json(userOrders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
});

export default router;

