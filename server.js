import dotenv from 'dotenv';
dotenv.config({ path: './uploads/.env' });  // Pointing to .env inside uploads directory

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;  // Use environment variable or default to 4000

// Check if MONGO_URI is properly loaded
console.log("MONGO_URI from .env:", process.env.MONGO_URI);  // Debugging line

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

// Connect to the database
connectDB();

// Serve static files from the "uploads" directory and allow cross-origin requests for them
app.use("/uploads", express.static("uploads", {
  setHeaders: (res, path) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    res.set("Access-Control-Allow-Origin", "*");
  }
}));

// Routes for food, user, cart, and orders
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Basic route for checking if the server is working
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server with error handling
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
}).on('error', (err) => {
  console.error("Server Error: ", err.message);
  process.exit(1);
});

