import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = {
        itemId: req.body.itemId,
        quantity: 1,
      };
    } else {
      cartData[req.body.itemId].quantity += 1;
    }

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = userData.cartData;

    if (cartData[req.body.itemId] && cartData[req.body.itemId].quantity > 1) {
      cartData[req.body.itemId].quantity -= 1;
    } else {
      delete cartData[req.body.itemId]; // Remove the item from cart
    }

    userData.cartData = cartData;               // Reassign updated cart
    userData.markModified("cartData");          // Mark field as modified
    await userData.save();                      // Save the changes

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, message: "Cart retrieved", cartData: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart", error: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
