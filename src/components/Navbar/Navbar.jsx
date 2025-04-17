import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/frontend_assets/logo.jpg";
import search_icon from "../../assets/frontend_assets/search_icon.png";
import basket_icon from "../../assets/frontend_assets/basket_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems, getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const cartItemCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("Mobile App")}
            className={menu === "Mobile App" ? "active" : ""}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("Contact Us")}
            className={menu === "Contact Us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="navbar-search-icon" />
        <Link to="/cart" className="navbar-basket">
          <img src={basket_icon} alt="Basket" />
          {cartItemCount > 0 && getTotalCartAmount() > 0 && (
            <div className="dot">{cartItemCount}</div>
          )}
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)} className="sign-in-btn">
            Sign In
          </button>
        ) : (
          <div
            className="navbar-profile"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <img src={assets.profile_icon} alt="Profile" />
            {isDropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li
                  onClick={() => {
                    navigate("/myorders");
                    setIsDropdownOpen(false);
                  }}
                >
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                >
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




