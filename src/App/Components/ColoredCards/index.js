/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { mobileBrands } from '../../Data/data';
import './index.css';

export default function ColoredCards(props) {
  const { data } = props;
  const { specifications } = data;
  return (
    <div className="colored-cards-container">
      <p className="cashback-text">Extra cashback $2000</p>
      <Link to={`/product?id=${data.productItemId}`} className="colored-cardd-links">
        <div className="colored-cards-inner-container">
          <div className="colored-cards-description">
            <h5>{data.productItemName}</h5>
            <p style={{ fontSize: '.75rem' }}>{`${specifications.Primary_Camera} Camera & ${specifications.Processor}`}</p>
            <h3>{`₹${data.price}`}</h3>
          </div>
          <div className="colored-cards-image-container">
            <img src={data.productItemImage.split(',')[0]} width="70px" height="100px" alt="sample" />
          </div>

        </div>
      </Link>
    </div>
  );
}

export function Brands(props) {
  const isMobile = useMediaQuery('(max-width:1100px)');
  const isSmallMobile = useMediaQuery('(max-width:500px)');

  const {
    samsung, vivo, oppo, apple, redmi, oneplus,
  } = props;
  const mobilesData = [samsung, vivo, oppo, apple, redmi, oneplus];

  return (
    <Box display="flex" flexDirection="column">
      <div className="brands-collective-container">
        { mobileBrands.map((item, index) => (
          <Link to={`/mobiles/filter?Brands=${item.brandId}`} className="colored-cardd-links" key={index}>
            <div className="brand-container">
              <div className="brand-image-container">
                <img src={item.logo} alt="logo" className="logo-img" />
              </div>
              <h4 className="brands-text">Shop Now</h4>
              <h3 className="brands-text mobile-page-link">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Box display="flex" flexDirection="column" padding="8px">
        <Box display="grid" gridTemplateColumns={isSmallMobile ? 'auto' : isMobile ? '45% 45%' : '30% 30% 30%'} gap="1rem" justifyContent="space-around">
          {mobilesData.map((data, index) => <ColoredCards data={data[0]} key={index} />)}
        </Box>
        {/* <Box display="flex" flexDirection="column" width="100%" boxShadow={2} marginBottom={2} bgcolor="whitesmoke">
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" borderBottom="1px solid lightgrey" p="1rem 2rem">
            <Typography variant="h6">Samsung</Typography>
            <Button variant="contained" endIcon={<NavigateNextIcon />}>View All</Button>
          </Box>
          <Box display="flex" flexDirection="row">
            <MobilePageMediumSizedCard data={samsung[0]} />
            <MobilePageMediumSizedCard data={samsung[1]} />
            <MobilePageMediumSizedCard data={samsung[2]} />
            <MobilePageMediumSizedCard data={samsung[3]} />
          </Box>
        </Box> */}
        {/* <Box display="flex" flexDirection="column" width="100%" boxShadow={2} marginBottom={2} bgcolor="whitesmoke">
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" borderBottom="1px solid lightgrey" p="1rem 2rem">
            <Typography variant="h6">Apple</Typography>
            <Button variant="contained" endIcon={<NavigateNextIcon />}>View All</Button>
          </Box>
          <Box display="flex" flexDirection="row">
            <MobilePageMediumSizedCard data={apple[0]} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" width="100%" boxShadow={2} marginBottom={2} bgcolor="whitesmoke">
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" borderBottom="1px solid lightgrey" p="1rem 2rem">
            <Typography variant="h6">Samsung</Typography>
            <Button variant="contained" endIcon={<NavigateNextIcon />}>View All</Button>
          </Box>
          <Box display="flex" flexDirection="row">
            <MobilePageMediumSizedCard />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}

export function MobilePageMediumSizedCard(props) {
  const { data } = props;
  console.log(data);
  return (
    <div className="mobile-page-medium-sized-card-container">
      <a className="mobile-page-link" href="hi">
        <img src={data.productItemImage.split(',')[0]} height="140px" width="140px" style={{ borderRadius: '8px' }} alt="mbl" />
      </a>
      <div className="mobile-page-medium-sized-card-inner-container">
        <a className="mobile-page-link" href="hi"><p>{data.productItemName}</p></a>
        <div className="medium-sized-card-rating-container">
          <div className="rating">
            <Typography variant="subtitle2" fontSize="inherit">{data.rating}</Typography>
            <StarRateIcon color="inherit" fontSize="inherit" />
          </div>
          <Typography variant="subtitle2" color="GrayText">{`${data.numberOfRatings} ratings`}</Typography>
        </div>
        <Typography>{`₹${data.price}`}</Typography>
      </div>
    </div>
  );
}
