/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ImageCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToScroll: 1,
  };
  return (
    <div className="carousel-container carousel">
      <Slider {...settings}>
        <div>
          <img src="https://images.unsplash.com/photo-1542228227152-511d6b6bbe1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxmcmVlJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&h=300&w=1600&q=60" alt="image1" style={{ minHeight: '150px' }} />
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1565274265853-9d1f55d9cb7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcwfHxmcmVlJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&h=300&w=1600&q=60" alt="image2" style={{ minHeight: '150px' }} />
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1534272521029-e035b59b146e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAxfHxmcmVlJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&h=300&w=1600&q=60" alt="image3" style={{ minHeight: '150px' }} />
        </div>
      </Slider>
    </div>
  );
}

export function NextBtn(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon style={{ color: 'black', fontSize: '20px' }} />
    </div>
  );
}

export function PreviousBtn(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon style={{ color: 'black', fontSize: '20px' }} />
    </div>
  );
}
