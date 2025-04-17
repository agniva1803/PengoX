import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate(); // ✅ Now correctly defined

  const subtotal = getTotalCartAmount(); // ✅ Use getTotalCartAmount instead of manually calculating it
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  // Check if there are any items in the cart
  const hasItems = Object.values(cartItems).some(quantity => quantity > 0);

  // If no items are selected, render a blank state
  if (!hasItems) {
    return (
      <div className="cart" id="cart">
        <div className="cart-empty">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  // If items are selected, render the full cart
  return (
    <div className="cart" id="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-title cart-items-item">
                <img src={`${url}${item.imageUrl}`} alt={item.name} className="cart-item-image" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                  Remove
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Total Section */}
      <div className="cart-bottom">
        <div className="cart-total">
        <h2>Cart Total</h2>
        
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p> {/* ✅ Using getTotalCartAmount() */}
        </div>
        <hr />
        
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${deliveryFee.toFixed(2)}</p>
        </div>
        <hr />
        
        <div className="cart-total-details">
          <p><b>Grand Total</b></p>
          <p><b>${total.toFixed(2)}</b></p>
        </div>
        <hr />

        <div className="cart-total-details">
          <p><b>Total (Including Taxes)</b></p>
          <p><b>${(total * 1.1).toFixed(2)}</b></p> {/* ✅ Example: Adding 10% tax */}
        </div>
        </div>
        
        <button onClick={() => navigate('/order')} className="checkout-btn">Checkout</button>
      </div>

      {/* Promo Code Section */}
      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter Promo Code" />
            <button className="apply-btn">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;



