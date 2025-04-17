import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFood =
    category === "All"
      ? food_list
      : food_list.filter((food) => food.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.imageUrl} // ✅ use imageUrl from backend
            />
          ))
        ) : (
          <p>No items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;












