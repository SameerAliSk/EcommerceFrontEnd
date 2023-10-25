/* eslint-disable no-unused-vars */
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import './index.css';

function ReviewCard(props) {
  const {
    productReviewId, customerName, review, rating,
  } = { ...props };

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-rating-container">
          <span style={{ margin: '0px 3px 0px 0px' }}>{rating}</span>
          <AiFillStar />
        </div>
        <h3 className="review-user-name">{customerName.split('@')[0]}</h3>
      </div>
      <p className="review-content">{review}</p>
      <div className="review-card-footer">
        <MdVerified />
        <span className="review-card-footer-content">Certified Buyer</span>
      </div>
    </div>
  );
}
export default ReviewCard;
