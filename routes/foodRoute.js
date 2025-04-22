import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set upload folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp for unique filenames
    }
});

const upload = multer({ storage: storage });

// Define a route for adding food
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;

