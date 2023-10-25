/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import './index.css';

function CompareImageCard(props) {
  const { productItemDetails } = { ...props };
  const {
    productItemImage, productItemName, rating,
    specifications, numberOfRatings, numberOfReviews, price,
  } = { ...productItemDetails };

  return (
    <div className="product-image-compare-card">
      <img src={productItemImage === undefined ? '' : productItemImage.split(',')[0]} alt="product-item-image" className="compare-product-image" />
      <p className="compare-product-name">{productItemName}</p>
      <div className="compare-product-rating-container">
        <span style={{ margin: '0px 3px 0px 0px' }}>{rating}</span>
        <AiFillStar />
      </div>
      <p className="compare-product-price">
        ₹
        {price}
      </p>
    </div>
  );
}

export default CompareImageCard;
