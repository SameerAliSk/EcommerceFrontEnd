/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import OrderCard from '../../Components/OrderCard';
import { orderUrl } from '../../Environment/URL';
import './index.css';

function Orders() {
  const [Orders, setOrders] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [OrdersPresent, setIsOrdersPresent] = useState(false);
  const [error, setError] = useState(false);

  const imageNotFound = 'https://cdni.iconscout.com/illustration/premium/thumb/man-finding-nothing-in-order-4006350-3309936.png?f=webp';

  const GetOrders = async () => {
    const customerId = localStorage.getItem('customerId');
    const response = await fetch(`${orderUrl}/${customerId}`);
    if (response.ok) {
      const responseData = await response.json();
      setOrders(responseData);
      setIsOrdersPresent(responseData.length > 0);
      setIsLoading(false);
    } else {
      setOrders([]);
      setIsOrdersPresent(false);
      setIsLoading(false);
    }
    setError(false);
  };

  useEffect(() => {
    try {
      GetOrders();
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="order-page">
      { IsLoading ? <div className="spinner-container"><TailSpin color="blue" radius="8px" /></div>
        : (OrdersPresent
          ? (
            <div className="order-container">
              { Orders.map((order) => <OrderCard key={order.orderId} {...order} />) }
            </div>
          )
          : (
            <div className="not-found-card-container">
              <img src={imageNotFound} alt="Not Found" className="image-not-found" />
              <h2>No orders placed yet</h2>
              <p>
                Looks like you have not placed an order yet.
                <br />
                Add items to your cart and checkout when you are ready
              </p>
              <button className="explore-button">Explore products</button>
            </div>
          ))}
      {error && <h1>Something went wrong</h1>}
    </div>
  );
}

export default Orders;
