/* eslint-disable quote-props */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  TextField, Button, IconButton, InputAdornment, Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { findUserUrl, resetPasswordUrl } from '../../Environment/URL';

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const userSchema = yup.object().shape({
    email: yup.string().email().required('*required'),
  });

  const userSchema1 = yup.object().shape({
    password: yup
      .string()
      .required('*required')
      .matches(passwordRegex, 'Must Contain 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });

  const checkUser = async (values, actions) => {
    try {
      const userDetails = values;
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };
      const response = await fetch(findUserUrl, options);
      if (!response.ok) {
        actions.setSubmitting(false);
        setError(true);
      } else {
        setEmail(values.email);
        setIsUserAvailable(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleFormSubmit = async (values, actions) => {
    try {
      const userDetails = { 'email': email, 'password': values.password };
      const options = {
        method: 'PUT',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };
      const response = await fetch(resetPasswordUrl, options);
      if (!response.ok) {
        actions.setSubmitting(false);
      } else {
        const responseJson = await response.json();
        setMessage(responseJson.message);
        setTimeout(() => navigate('/account/login?value=true'), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-text-container">
        <Typography variant="h4" color="ghostwhite" marginBottom={2}>Forgot your Password?</Typography>
        <Typography variant="subtitle1" color="whitesmoke">
          We will help you to regain your experience
        </Typography>
      </div>
      <div className="login-container forgot">
        <Formik
          onSubmit={checkUser}
          initialValues={{ email: '' }}
          validationSchema={userSchema}
        >
          {({
            values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} onChange={() => setError(false)} className="login-form">
              <Typography variant="h4" color="#1976d2" className="mobile-login-title" marginBottom={2}>Forgot Password</Typography>
              {error && <Typography variant="subtitle1" color="red">Email Id not Found</Typography>}
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
                disabled={isUserAvailable}
              />
              <Button type="submit" variant="contained" fullWidth disabled={isUserAvailable}>Verify Email</Button>
            </form>
          )}
        </Formik>
        {isUserAvailable
              && (
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={{ password: '', confirmPassword: '' }}
                  validationSchema={userSchema1}
                >
                  {({
                    values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit} className="login-form">
                      <TextField
                        variant="standard"
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={message !== ''}
                        value={values.password}
                        error={!!touched.password && errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment:
                          (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                name="visibility"
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        variant="standard"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={message !== ''}
                        value={values.confirmPassword}
                        error={!!touched.confirmPassword && errors.confirmPassword}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        InputProps={{
                          endAdornment:
                  (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                        }}
                      />
                      <Button type="submit" variant="contained" fullWidth disabled={isSubmitting || message !== ''}>Reset Password</Button>
                      {message && <Typography variant="subtitle1" color="green">{message}</Typography>}
                    </form>
                  )}
                </Formik>
              )}
      </div>
    </div>
  );
}
