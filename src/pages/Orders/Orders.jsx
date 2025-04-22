// admin/src/pages/Orders/Orders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';
import { assets } from '../../assets/admin_assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // ⚠️ Exact, case-sensitive path:
        const res = await axios.get(`${url}/api/order/listOrders`);
        console.log('🎉 listOrders response:', res.data);
        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          toast.error(res.data.message || 'Error fetching orders');
        }
      } catch (err) {
        console.error('❌ fetchAllOrders error:', err);
        toast.error('Server error while fetching orders');
      }
    };

    fetchAllOrders();
  }, [url]);

  return (
    <div className='orders-page'>
      <h2>Orders</h2>
      <div className='orders-grid'>
        {orders.length === 0 
          ? <p className='no-orders'>No orders found.</p>
          : orders.map(o => (
              <div key={o._id} className='order-card'>
                <div className='order-header'>
                  <img src={assets.parcel_icon} alt='parcel' />
                  <div>
                    <p><strong>ID:</strong> {o._id}</p>
                    <p><strong>Status:</strong> {o.status}</p>
                    <p><strong>Amt:</strong> ₹{o.amount}</p>
                  </div>
                </div>
                <div className='order-items'>
                  <ul>
                    {o.items.map((it, i) => (
                      <li key={i}>{it.name} × {it.quantity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Orders;




