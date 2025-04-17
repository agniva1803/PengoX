import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, food_list, url, userId } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: ""
  });

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const address = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      phoneNumber: data.phoneNumber
    };

    const items = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
        image: item.imageUrl
      }));

    try {
      const response = await axios.post(`${url}/api/order/place`, {
        items,
        amount: total,
        address,
        userId  // 👈 Add this line
      }, {
        headers: {
          token
        }
      });      

      if (response.data.success && response.data.session_url) {
        window.location.href = response.data.session_url;
      } else {
        alert("Failed to create payment session.");
      }
    } catch (err) {
      console.error("Order placement error:", err);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="place-order-title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" required />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" required />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" required />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="Zip Code" required />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" required />
        </div>
        <input name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} type="text" placeholder="Phone Number" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
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
            <p><b>${(total * 1.1).toFixed(2)}</b></p>
          </div>
        </div>
        <button type="submit" className="checkout-btn">Proceed to Payment</button>
      </div>
    </form>
  );
};

export default PlaceOrder;






