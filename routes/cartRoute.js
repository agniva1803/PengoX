import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartControllers.js'; // Ensure .js extension
import authMiddleware from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
