import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useContext(StoreContext);
  const baseURL = "http://localhost:4000";

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${baseURL}/api/order/userOrders`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleTrackOrder = (orderId) => {
    alert(`Tracking info for Order ID: ${orderId}`);
    // Placeholder: Replace with actual logic or route navigation
  };

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-info">
                <p className="status">
                  <strong>Status:</strong> Food Processing
                </p>
                <p className={order.payment ? "paid" : "unpaid"}>
                  <strong>Payment:</strong> {order.payment ? "Paid" : "Unpaid"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleString()}
                </p>
                <p>
                  <strong>Total:</strong> ₹{(order.amount * 80).toFixed(2)}
                </p>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    {item.image && (
                      <img
                        src={`${url}${item.image}`}
                        alt={item.name}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                    <div className="order-item-details">
                      <p className="name">{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{(item.price * 86.1).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Track Order Button */}
              <button
                className="track-order-btn"
                onClick={() => handleTrackOrder(order._id)}
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;







