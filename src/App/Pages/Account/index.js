import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSearchParams, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../../Components/Header';
import { Categories } from '../../Components/Header/Categories';
import ForgotPassword from '../../Components/Login/ForgotPassword';
import Footer from '../../Components/Footer';
import Login from '../../Components/Login/Login';
import SignUp from '../../Components/Login/SignUp';

export default function Account() {
  const jwtToken = Cookies.get('jwtToken');
  const isMobile = useMediaQuery('(max-width:768px)');
  const [searchParams] = useSearchParams();
  const value = searchParams.get('value');
  const redirectTo = searchParams.get('redirectTo');
  const signup = searchParams.get('signup');
  const forgot = searchParams.get('forgot');

  return (

    jwtToken ? (<Navigate to="/" replace />)
      : (
        <div style={{ backgroundColor: 'ghostwhite' }}>
          <Header accountPage />
          <Categories images={false} />
          <Box height="80vh" width={isMobile ? '100vw' : '60vw'} margin="auto">
            {value && <Login redirectTo={redirectTo} />}
            {signup && <SignUp />}
            {forgot && <ForgotPassword />}
          </Box>
          <Footer />
        </div>
      )

  );
}
