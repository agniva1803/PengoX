import express from "express";
import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    console.log("Request File:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: `/uploads/${req.file.filename}`, // Fix path issue
    });

    await food.save();
    res.status(200).json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.foodId);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Delete the image file if it exists
    const filePath = `.${food.imageUrl}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.foodId);

    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
