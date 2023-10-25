/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './index.css';

function ReviewSectionTextArea(props) {
  const { reviewText, refProp } = props;

  const [newReviewText, setNewReviewText] = useState(reviewText);

  const HandleTextareaChange = (event) => {
    setNewReviewText(event.target.value);
    refProp.current.value = event.target.value;
  };

  return (
    <div className="add-review-field-container">
      <span>Description</span>
      <textarea ref={refProp} onChange={HandleTextareaChange} value={newReviewText} rows={8} className="add-review-text-area-field" placeholder="Write your review here..." name="review-section-textarea" id="review-section-textarea-id" />
    </div>
  );
}

export default ReviewSectionTextArea;
