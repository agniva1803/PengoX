/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);

  // ✅ Decode userId from JWT
  const userId = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id || decoded._id || decoded.userId; // adapt if your JWT uses a different key
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  }, [token]);

  const addToCart = useCallback(async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      console.log("No token found, user not authenticated");
    }
  }, [token]);

  const removeFromCart = useCallback(async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (!updatedCart[itemId]) return prev;

      updatedCart[itemId] -= 1;
      if (updatedCart[itemId] === 0) {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, {
          headers: { token }
        });
      } catch (err) {
        console.error("Error removing item from backend cart", err);
      }
    }
  }, [token]);

  const getCartFromBackend = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.post(url + "/api/cart/get", {}, {
        headers: { token }
      });

      if (response.data.success) {
        const backendCart = response.data.cartData || {};

        const convertedCart = {};
        for (const itemId in backendCart) {
          convertedCart[itemId] = backendCart[itemId].quantity;
        }

        setCartItems(convertedCart);
      } else {
        console.warn("Failed to fetch cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
    }
  }, [token]);

  const getTotalCartAmount = useCallback(() => {
    let totalAmount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const itemInfo = food_list.find((product) => product._id === key);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[key];
        }
      }
    }
    return totalAmount;
  }, [cartItems, food_list]);

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
  
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          console.log("Decoded userId:", decoded.id); // or whatever key you use for userId
        } catch (err) {
          console.error("Failed to decode token:", err);
        }
      }
    };
  
    loadData();
  }, []);
  const contextValue = useMemo(
    () => ({
      category,
      setCategory,
      food_list,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getCartFromBackend,
      url,
      token,
      setToken,
      userId, // ✅ now exposed to context
    }),
    [
      category,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getCartFromBackend,
      food_list,
      token,
      url,
      userId,
    ]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;










