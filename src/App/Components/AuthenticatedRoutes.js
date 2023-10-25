/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { RestrictedAccess } from './NoResultsFound';

export default function AuthenticatedRoutes({ children }) {
  const jwtToken = Cookies.get('jwtToken');
  const location = useLocation();

  return (
    jwtToken ? children : <RestrictedAccess redirectTo={location.pathname} />
  );
}
