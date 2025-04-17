import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  if (!menu_list) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="explore-menu" id="explore-menu"> {/* Added id="explore-menu" */}
      <h2>Explore Our Menu</h2>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes that satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((menu, index) => (
          <div 
            key={index} 
            className="explore-menu-list-item"
            onClick={() => setCategory(prev => prev === menu.menu_name ? "All" : menu.menu_name)}
          >  
            <img 
              className={category === menu.menu_name ? "active" : ""}
              src={menu.menu_image} 
              alt={menu.menu_name} 
            />
            <p>{menu.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;




