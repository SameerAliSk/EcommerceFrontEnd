/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReviewCard from '../ReviewCard';
import ReviewSectionTextArea from '../ReviewSectionTextArea';
import Loading from '../Loading';
import SomethingWentWrong from '../SomethingWentWrong';
import './index.css';

function ProductRatingsAndReviews(props) {
  const customerId = localStorage.getItem('customerId');
  const { productId } = props;
  const [reviewSummary, setReviewSummary] = useState({});
  const [reviewPage, setReviewPage] = useState(1);
  const [productReviewsFetchStatus, setproductReviewsFetchStatus] = useState('loading');
  const [sortingOnRatingAsc, setSortingOnRatingAsc] = useState(false);
  const [rating, setRating] = useState(0);
  const [rateProductClicked, setRateProductClicked] = useState(false);
  const [reviewable, setReviewable] = useState(false);
  const [reviewableFetchStatus, setreviewableFetchStatus] = useState('loading');
  const [reviewDataFetchStatus, setReviewDataFetchStatus] = useState('loading');
  const [rateProductError, setRateProductError] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewId, setReviewId] = useState('');
  const textareaRef = useRef(reviewText);
  const stars = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const location = useLocation();

  const noReviewImageUrl = 'https://1.bp.blogspot.com/-7gAG1CS_-GY/YR7XD-axEZI/AAAAAAAAKrw/-5poKoXRiMon490omdLK8B7qH-hsc_EcQCLcBGAsYHQ/w1200-h630-p-k-no-nu/Making-Ratings-and-Reviews-better-for-users-developers-v2.png';
  const nonReviewableProductImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYffyYkW6X7-Hqxkk2QjN1W2Os0F7zHyxXlQ&usqp=CAU';

  const GetReviews = async () => {
    try {
      const reviewFetchUrl = `https://localhost:7258/api/Review/all/${productId}?sortOnRatingAsc=${sortingOnRatingAsc}&page=${reviewPage}`;
      const response = await fetch(reviewFetchUrl);
      if (response.ok) {
        const responseData = await response.json();
        setReviewSummary(responseData);
        setproductReviewsFetchStatus('success');
      } else {
        setproductReviewsFetchStatus('failure');
      }
    } catch (err) {
      setproductReviewsFetchStatus('failure');
    }
  };

  const HandleRateProduct = async () => {
    if (customerId) {
      setRateProductClicked(true);
      try {
        const isProductReviewableUrl = `https://localhost:7258/api/Review/IsProductReviewable/${customerId}/${productId}`;
        const response = await fetch(isProductReviewableUrl);
        if (response.ok) {
          setReviewable(true);
          setreviewableFetchStatus('success');
          const fetchReviewUrl = `https://localhost:7258/api/Review/IsReviewPresent/${customerId}/${productId}`;
          try {
            const reviewResponse = await fetch(fetchReviewUrl);
            if (reviewResponse.ok) {
              setReviewDataFetchStatus('success');
              const reviewData = await reviewResponse.json();
              if (reviewData.isAvailable) {
                setReviewText(reviewData.review.review);
                setReviewId(reviewData.review.productReviewId);
                setRating(reviewData.review.rating);
              }
            } else {
              setReviewDataFetchStatus('failure');
            }
          } catch (err) {
            setReviewDataFetchStatus('failure');
          }
        } else if (response.status === 404) {
          setReviewable(false);
          setreviewableFetchStatus('success');
        } else {
          setreviewableFetchStatus('failure');
        }
      } catch (err) {
        setreviewableFetchStatus('failure');
      }
    } else {
      navigate(`/account/login?value=true&redirectTo=${location.pathname}`);
    }
  };

  const HandleStarClick = (star) => {
    setRating(star);
  };

  const GetToolTipText = (index) => {
    switch (index) {
      case 1:
        return 'Very Bad';
      case 2:
        return 'Bad';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  };

  const handleClose = () => {
    setRateProductClicked(false);
    setReviewable(false);
    setreviewableFetchStatus('loading');
    setReviewDataFetchStatus('loading');
  };

  const HandleSubmit = async () => {
    console.log(textareaRef.current.value);
    setReviewText(textareaRef.current.value);
    if (rating === 0) {
      setRateProductError('*Rating cannot be empty.Select a rating..!!!');
      setTimeout(() => setRateProductError(''), 5000);
    } else if (reviewId === '') {
      const addReviewObject = {
        CustomerId: customerId,
        ProductId: productId,
        Review: textareaRef.current.value,
        Rating: rating,
      };
      const addReviewUrl = 'https://localhost:7258/api/Review';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addReviewObject),
      };
      const response = await fetch(addReviewUrl, options);
      if (response.ok) {
        const responseData = await response.json();
        setRating(responseData.rating);
        setReviewText(responseData.review);
        setReviewId(responseData.productReviewId);
        setRateProductError('Review Added Successfully :)');
        setTimeout(() => setRateProductError(''), 5000);
        GetReviews();
      } else {
        setRateProductError('Something went wrong :( unable to add review, Try again later');
        setTimeout(() => setRateProductError(''), 5000);
      }
    } else {
      const editReviewObject = {
        ProductReviewId: reviewId,
        Review: textareaRef.current.value,
        Rating: rating,
      };
      const editReviewUrl = 'https://localhost:7258/api/Review';
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editReviewObject),
      };
      const response = await fetch(editReviewUrl, options);
      if (response.ok) {
        const responseData = await response.json();
        setRating(responseData.rating);
        setReviewText(responseData.review);
        setReviewId(responseData.productReviewId);
        setRateProductError('Review edited Successfully :)');
        setTimeout(() => setRateProductError(''), 5000);
        GetReviews();
      } else {
        setRateProductError('Something went wrong :( unable to edit review, Try again later');
        setTimeout(() => setRateProductError(''), 5000);
      }
    }
  };

  const ChangeSortOrder = (event) => {
    setSortingOnRatingAsc(event.target.value === 'negative');
  };

  const PreviousReviewsPage = () => {
    setReviewPage((prev) => prev - 1);
  };

  const NextReviewsPage = () => {
    setReviewPage((prev) => prev + 1);
  };

  useEffect(() => {
    GetReviews();
  }, [reviewPage, sortingOnRatingAsc]);

  function GetJsx() {
    if (productReviewsFetchStatus === 'success') {
      return (
        <div className="reviews-section-container">
          <div className="reviews-section-header">
            <h1 className="reviews-section-heading">Ratings & Reviews</h1>
            {!rateProductClicked && <button className="rate-product-button box-shadow-class" onClick={HandleRateProduct}>Rate Product</button>}
          </div>
          {rateProductClicked && (reviewableFetchStatus === 'success'
            ? (reviewable ? (reviewDataFetchStatus === 'success' ? (
              <div className="box-shadow-class add-rating-review-fields-container">
                <h2 className="add-rating-prompt-heading">Rate this product*</h2>
                <div className="rating-icons-and-text-container">
                  {stars.map((star) => (
                    <span key={star} className="star-tooltip-container">
                      <BsFillStarFill className="add-rating-star-icon" onClick={() => HandleStarClick(star)} color={star <= rating ? 'yellow' : 'lightgray'} />
                      <span className="rating-tooltip">{GetToolTipText(star)}</span>
                    </span>
                  ))}
                  <span className="given-rating-text" style={{ color: rating >= 3 ? 'green' : rating === 2 ? 'orange' : 'red' }}>{GetToolTipText(rating)}</span>
                </div>
                <hr />
                <h2 className="add-rating-prompt-heading">Review this product</h2>
                <ReviewSectionTextArea refProp={textareaRef} reviewText={reviewText} />
                <p className="rate-product-error-msg">{rateProductError}</p>
                <div className="review-section-buttons-container">
                  <button className="review-section-cancel-btn review-section-btns" onClick={handleClose}>Cancel</button>
                  <button className="review-section-btns review-section-submit-btn" onClick={HandleSubmit}>Submit</button>
                </div>
              </div>
            ) : <SomethingWentWrong />) : (
              <div className="box-shadow-class product-not-reviewable-container">
                <img className="product-not-reviewable-image" src={nonReviewableProductImageUrl} alt="product-not-reviewable" />
                <p className="product-not-reviewable-content">You have not purchased this product yet. Cannot Review the product</p>
                <button className="product-not-reviewable-close-btn review-section-btns" onClick={handleClose}>Close</button>
              </div>
            ))
            : reviewableFetchStatus === 'failure'
              ? <SomethingWentWrong />
              : <Loading />)}
          <div className="reviews-summary">
            <div className="average-total-reviews-ratings-container">
              <div>
                <span className="average-product-rating">{reviewSummary.averageRating}</span>
                <BsFillStarFill fontSize="24px" color="black" />
              </div>
              <p className="total-reviews-ratings">
                {reviewSummary.totalRatings}
                {' '}
                Ratings &
                {' '}
                <br />
                {' '}
                {reviewSummary.totalReviews}
                {' '}
                Reviews
              </p>
            </div>
            <hr className="vertical-separation" />
            <ul className="individual-ratings-list">
              <li className="individual-rating-list-item">
                <div className="star-rating-container">
                  <span className="rating-num">5</span>
                  <BsFillStarFill fontSize="11px" color="black" />
                </div>
                <div className="progress-bar-outer-container">
                  <div className="progress-bar-inner-container" style={{ width: `${Math.ceil((reviewSummary.fiveStarRatings / reviewSummary.totalRatings) * 100)}%`, backgroundColor: 'green' }} />
                </div>
                <p className="individual-rating-number">{reviewSummary.fiveStarRatings}</p>
              </li>
              <li className="individual-rating-list-item">
                <div className="star-rating-container">
                  <span className="rating-num">4</span>
                  <BsFillStarFill fontSize="11px" color="black" />
                </div>
                <div className="progress-bar-outer-container">
                  <div className="progress-bar-inner-container" style={{ width: `${Math.ceil((reviewSummary.fourStarRatings / reviewSummary.totalRatings) * 100)}%`, backgroundColor: 'green' }} />
                </div>
                <p className="individual-rating-number">{reviewSummary.fourStarRatings}</p>
              </li>
              <li className="individual-rating-list-item">
                <div className="star-rating-container">
                  <span className="rating-num">3</span>
                  <BsFillStarFill fontSize="11px" color="black" />
                </div>
                <div className="progress-bar-outer-container">
                  <div className="progress-bar-inner-container" style={{ width: `${Math.ceil((reviewSummary.threeStarRatings / reviewSummary.totalRatings) * 100)}%`, backgroundColor: 'green' }} />
                </div>
                <p className="individual-rating-number">{reviewSummary.threeStarRatings}</p>
              </li>
              <li className="individual-rating-list-item">
                <div className="star-rating-container">
                  <span className="rating-num">2</span>
                  <BsFillStarFill fontSize="11px" color="black" />
                </div>
                <div className="progress-bar-outer-container">
                  <div className="progress-bar-inner-container" style={{ width: `${Math.ceil((reviewSummary.twoStarRatings / reviewSummary.totalRatings) * 100)}%`, backgroundColor: 'orange' }} />
                </div>
                <p className="individual-rating-number">{reviewSummary.twoStarRatings}</p>
              </li>
              <li className="individual-rating-list-item">
                <div className="star-rating-container">
                  <span className="rating-num">1</span>
                  <BsFillStarFill fontSize="11px" color="black" />
                </div>
                <div className="progress-bar-outer-container">
                  <div className="progress-bar-inner-container" style={{ width: `${Math.ceil((reviewSummary.oneStarRatings / reviewSummary.totalRatings) * 100)}%`, backgroundColor: 'red' }} />
                </div>
                <p className="individual-rating-number">{reviewSummary.oneStarRatings}</p>
              </li>
            </ul>
          </div>
          <div className="sorting-select-container">
            <select value={sortingOnRatingAsc ? 'negative' : 'positive'} name="review-section-sort-select" id="review-section-sort-select-id" onChange={(event) => ChangeSortOrder(event)} className="rating-sort-select-element box-shadow-class">
              <option value="positive">Positive First</option>
              <option value="negative">Negative First</option>
            </select>
          </div>
          <h2 style={{ fontWeight: '500', marginBottom: '0px', marginTop: '10px' }}>Reviews</h2>
          {reviewSummary.reviews.length === 0 && (
          <div className="no-reviews-container">
            <img className="no-reviews-image" src={noReviewImageUrl} alt="no reviews" />
            <h3 className="no-reviews-heading">No Reviews available for the product yet</h3>
            <p className="no-reviews-content">Be the first to review this product</p>
          </div>
          )}
          {reviewSummary.reviews.length > 0 && (
          <ul className="reviews-list">
            {reviewSummary.reviews.map((review) => <ReviewCard key={review.productReviewId} {...review} />)}
          </ul>
          )}
          <div className="reviews-section-pagination-container">
            <button disabled={reviewPage <= 1} onClick={PreviousReviewsPage} className="pagination-buttons box-shadow-class"><AiOutlineLeft /></button>
            <span className="pagination-page-information">
              page
              {' '}
              {reviewPage}
              {' '}
              of
              {' '}
              {Math.ceil(reviewSummary.totalReviews / 10)}
            </span>
            <button onClick={NextReviewsPage} disabled={reviewPage >= Math.ceil(reviewSummary.totalReviews / 10)} className="pagination-buttons box-shadow-class"><AiOutlineRight /></button>
          </div>
        </div>
      );
    }
    if (productReviewsFetchStatus === 'failure') {
      return (
        <SomethingWentWrong />
      );
    }
    return (
      <Loading />
    );
  }

  return (
    <GetJsx />
  );
}

export default ProductRatingsAndReviews;
