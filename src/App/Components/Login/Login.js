/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  TextField, Button, IconButton, InputAdornment, Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Login.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginUrl } from '../../Environment/URL';

export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    setSignup, modal, redirectTo, handleClose,
  } = props;
  const redirectLink = redirectTo || '/';
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const userSchema = yup.object().shape({
    email: yup.string().email().required('*required'),
    password: yup
      .string()
      .required('*required'),
  });

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (values, actions) => {
    setError(false);
    const userDetails = { ...values };
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(loginUrl, options);
    const responseJson = await response.json();
    if (response.ok) {
      const { jwtToken, customerId, customerEmail } = responseJson;
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('customerEmail', customerEmail);
      Cookies.set('jwtToken', jwtToken, { expires: 90 });
      if (modal) handleClose();
      navigate(redirectLink);
    } else {
      setError(true);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={`login-page ${!modal && 'not-modal'}`}>
      <div className="login-text-container">
        <Typography variant="h4" color="ghostwhite" marginBottom={2}>Login</Typography>
        <Typography variant="subtitle1" color="whitesmoke">
          Get access to your Orders, Wishlist and Recommendations
        </Typography>
      </div>
      <div className="login-container">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="login-form" onChange={() => setError(false)}>
              <Typography variant="h4" color="#1976d2" className="mobile-login-title" marginBottom={2}>Login</Typography>
              {error && <Typography variant="subtitle1" color="red">!Invalid username or password</Typography>}
              <TextField
                variant="standard"
                placeholder="Email id"
                type="email"
                fullWidth
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!touched.email && errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                variant="standard"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={!!touched.password && errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment:
                  (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClick}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>Login</Button>
            </form>
          )}
        </Formik>
        <div>
          <Typography variant="subtitle1" display="inline">  New here ?</Typography>
          {
            modal ? <Button variant="text" onClick={() => (setSignup((prev) => !prev))} disableTouchRipple>Create an account</Button>
              : <Link to="/account/login?signup=true" className="login-page-link"> Signup</Link>
          }
        </div>
        <Link to="/account/login?forgot=true" className="login-page-link">Forgot Password?</Link>
      </div>
    </div>
  );
}
