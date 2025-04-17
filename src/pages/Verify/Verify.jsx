import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css'; // optional, for styling

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token } = useContext(StoreContext);

  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(`${url}/api/order/verify`, {
          orderId,
          success,
        }, {
          headers: { token }
        });

        if (res.data.success) {
          setMessage("✅ Payment Successful! Your order has been placed.");
        } else {
          setMessage("❌ Payment Failed. Your order was not completed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setMessage("❌ An error occurred while verifying your payment.");
      }
    };

    if (orderId && success !== null) {
      verifyPayment();
    } else {
      setMessage("⚠️ Invalid verification request.");
    }
  }, [orderId, success, url, token]);

  return (
    <div className="verify-page">
        <div className="verify-box">
      <h2>{message}</h2>
    </div>
    </div>
  );
};

export default Verify;

