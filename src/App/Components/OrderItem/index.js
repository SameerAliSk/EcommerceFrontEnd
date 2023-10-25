import React from 'react';
import './index.css';

function OrderItem(props) {
  const {
    productItemImage, productItemName, quantity, price,
  } = { ...props };
  return (
    <li>
      <div className="item-card-container">
        <img src={productItemImage.split(',')[0]} alt="product-item-name" className="product-item-image" />
        <div className="product-item-details">
          <p className="product-item-detail-content">{productItemName}</p>
          <p className="product-item-detail-content">
            Quantity :
            {' '}
            <span className="price-qty">{quantity}</span>
          </p>
          <p className="product-item-detail-content">
            Price :
            {' '}
            <span className="price-qty">
              Rs
              {price}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
