/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Button, ButtonGroup, IconButton, Paper, Typography, Snackbar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import Header from '../../Components/Header';
import { cartUrl } from '../../Environment/URL';
import './index.css';
import Footer from '../../Components/Footer';

const jwtToken = Cookies.get('jwtToken');

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartState, setCartState] = useState(0);
  const navigate = useNavigate();

  useEffect(() => async () => {
    setLoading(true);
    const customerId = localStorage.getItem('customerId');
    if (jwtToken) {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const response = await fetch(`${cartUrl}/${customerId}`, options);
        if (response.ok) {
          const responseJson = await response.json();
          setCartData(responseJson);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setLoading(false);
  }, [cartState]);

  const toCheckOut = () => { navigate('/checkout'); };
  // const sum = cartData?.reduce((accumulator,
  // currentValue) => accumulator + currentValue.price, 0);

  return (
    <div className="cart-outer-container">
      <Header />
      {
        cartData.length > 0 ? (
          <Box className="cart-container" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginBottom: '.5rem', padding: '.5rem' }}>
              <Typography variant="h5" textAlign="center" fontSize="2rem" className="cart-heading">CART</Typography>
            </Box>
            {/* <Box height="60vh" overflow="auto"> */}
            {cartData.map((data) => (
              <CartItems
                data={data}
                key={data.cartProductItemId}
                setCartState={setCartState}
              />
            ))}
            {/* </Box> */}
            {/* <Typography variant="h5" sx={{ alignSelf: 'flex-end',
               marginRight: '20%', marginBottom: '1rem' }}>Total = ₹ {sum}</Typography> */}
            <div className="place-order-button-container">
              <button type="button" className="place-order" onClick={toCheckOut}>Place Order</button>
            </div>
          </Box>
        )
          : <EmptyCart />
      }
      <Footer />
    </div>
  );
}

export function EmptyCart() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/');
  };
  return (
    <Box className="empty-cart">
      <img
        src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
        width="40%"
        alt="empty cart"
      />
      <Typography variant="h5">Your cart is Empty</Typography>
      <Typography variant="subtitle2">Add items to the cart</Typography>
      <Button type="button" onClick={toHome} variant="contained" sx={{ width: '60%' }}>Shop Now</Button>
    </Box>
  );
}

export function CartItems(props) {
  const { data, setCartState } = props;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  const day = weekdays[d.getDay() - 1];

  const changeQuantity = async (mode) => {
    const cartItem = {
      cartProductItemId: data.cartProductItemId,
      quantity: mode === 'increment' ? data.quantity + 1 : data.quantity - 1,
    };
    try {
      const options = {
        method: 'PUT',
        body: JSON.stringify(cartItem),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(cartUrl, options);
      if (response.ok) setCartState((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const increaseQuantity = () => { changeQuantity('increment'); };
  const decreaseQuantity = () => { changeQuantity('decrement'); };

  const removeProduct = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${cartUrl}/${data.cartProductItemId}`, options);
      if (response.ok) setCartState((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="cart-item-container" display="flex" flexDirection="column">
      <Box className="cart-item" display="flex" gap="4%">
        <Link to={`/product?id=${data.productItemId}`}>
          <img
            className="item-img"
            src={data.productItemImage.split(',')[0]}
            alt="cartItem"
          />
        </Link>
        <Box gap={1} display="flex" flexDirection="column">
          <Typography variant="h5" fontWeight={400} fontSize={24}>{data.productItemName}</Typography>
          <Typography variant="body1" fontSize={16}>Delivery by next {day}</Typography>
          <Typography variant="body1" fontSize={16} color="GrayText">{data.sellerName}</Typography>
          <Typography fontWeight={500} fontSize={20}>
            ₹{data.price}
            <span className="offer"> %offers</span>
          </Typography>
        </Box>
      </Box>
      <ButtonGroup sx={{ margin: '1rem 0' }}>
        <IconButton onClick={decreaseQuantity} disabled={data.quantity <= 1}>
          <RemoveIcon className="icon-button" fontSize="2rem" />
        </IconButton>
        <span className="quantity">{data.quantity}</span>
        <IconButton onClick={increaseQuantity}>
          <AddIcon className="icon-button" fontSize="2rem" />
        </IconButton>
        <Button type="button" variant="text" color="inherit" aria-label="remove" onClick={removeProduct}>Remove</Button>
      </ButtonGroup>
    </Box>
  );
}
