/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import './index.css';
import { Box, CircularProgress, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';

export function Card(props) {
  const { data } = props;

  return (
    <div>
      <Link to={`/product?id=${data.productItemId}`} className="home-card-link">
        <div className="cards">
          <div className="card-img-container">
            <div className="card-img-inner">
              <img
                src={data.productItemImage.split(',')[0]}
                alt="productimg"
                className="card-img"
              />
            </div>
          </div>
          <div className="cards-context">
            <p className="product-name">{data.productItemName}</p>
            <div className="rating-container">
              <div className="ratings">
                <Typography
                  variant="subtitle2"
                  fontSize="inherit"
                  lineHeight="unset"
                >
                  {data.rating}
                </Typography>
                <StarRateIcon color="inherit" fontSize="inherit" />
              </div>
              <Typography variant="subtitle1" color="GrayText">
                {`(${data.numberOfRatings} ratings)`}
              </Typography>
            </div>
            <p className="product-price">{`₹ ${data.price}`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
function PreviousBtn(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon className="arrow-icon" />
    </div>
  );
}
function NextBtn(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon className="arrow-icon" />
    </div>
  );
}

export default function Cards(props) {
  const { mobileData, title } = props;
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="cards-container carousel">
      <h2>{`${title} mobiles`}</h2>
      {mobileData?.length > 0 ? (
        <Slider {...settings}>
          {mobileData?.map((item) => (
            <Card data={item} key={item.productId} />
          ))}
        </Slider>
      ) : (
        <Box height="30vh" textAlign="center" width="100vw"><CircularProgress /></Box>
      )}
    </div>
  );
}
