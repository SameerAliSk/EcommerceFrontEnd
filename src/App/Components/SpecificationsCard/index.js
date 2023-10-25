/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { cartUrl } from '../../Environment/URL';

function SpecificationsCard(props) {
  const { productItemDetails } = props;
  const { specifications, sellers } = productItemDetails;
  const [isProductInCart, setIsProductInCart] = useState(false);
  const customerId = localStorage.getItem('customerId');
  const jwtToken = Cookies.get('jwtToken');
  const navigate = useNavigate();
  const location = useLocation();

  const checkProductInCart = async () => {
    if (jwtToken && Object.keys(productItemDetails).length > 0) {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const url = `${cartUrl}/IsProductItemInCart/${customerId}/${productItemDetails.productItemId}`;
        const response = await fetch(url, options);
        const responseJson = await response.json();
        setIsProductInCart(responseJson.isAvailable);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => { checkProductInCart(); }, []);

  const addToCart = async () => {
    if (!isProductInCart) {
      if (jwtToken) {
        const cartItem = {
          customerId,
          productItemId: productItemDetails.productItemId,
          quantity: 1,
          sellerId: sellers[0].sellerId,
        };
        try {
          const options = {
            method: 'POST',
            body: JSON.stringify(cartItem),
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
          };
          const response = await fetch(cartUrl, options);
          const responseJson = await response.json();
        } catch (err) {
          console.log(err);
        }
      } else {
        navigate(`/account/login?value=true&redirectTo=${location.pathname}${location.search}`);
      }
    }
  };

  const handleBuyNow = async () => {
    if (jwtToken) {
      if (!isProductInCart) await addToCart();
      navigate(`/checkout?buynow=${productItemDetails.productItemId}`);
    } else {
      navigate(`/account/login?value=true&redirectTo=${location.pathname}${location.search}`);
    }
  };

  return (
    <ul className="specifications-list">
      {Object.keys(specifications).sort().map((item) => (
        <li className="specification" key={item}>
          {`${specifications[item]} ${item.split('_').join(' ')}`}
        </li>
      ))}
      <div className="specifications-button-container">
        <button type="button" className="specifications-button" onClick={addToCart}>Add to Cart</button>
        <button type="button" className="specifications-button" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </ul>
  );
}

export default SpecificationsCard;
