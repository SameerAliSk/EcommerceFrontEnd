/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoResultsImage from '../Images/error-no-search-results.png';

export default function NoResultsFound() {
  return (
    <Box margin="auto" textAlign="center">
      <img src={NoResultsImage} alt="no-results" />
      <h3>Sorry, no results found!</h3>
      <p>Please check the spelling or try searching for something else</p>
    </Box>
  );
}
export function RestrictedAccess(props) {
  const navigate = useNavigate();
  const { redirectTo } = props;

  const navigateToLogin = () => {
    navigate(`/account/login?value=true&redirectTo=${redirectTo}`);
  };

  return (
    <Box margin="10%" textAlign="center">
      <img src={NoResultsImage} alt="no-results" />
      <h3>Authentication Required</h3>
      <p>Login to access this page</p>
      <Button variant="contained" onClick={navigateToLogin} fullWidth>Login</Button>
    </Box>
  );
}
