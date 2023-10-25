/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Button, Typography, IconButton,
} from '@mui/material';
import Cookies from 'js-cookie';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddressForm from './AddressForm';
import { addressUrl } from '../../Environment/URL';

export default function DisplayAddress(props) {
  const jwtToken = Cookies.get('jwtToken');
  const [show, setShow] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const { data, setAddressState, profile } = props;
  const ref = useRef();

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [handleClick]);

  const handleEdit = () => {
    setEditAddress(true);
    setShow(false);
  };

  const handleDelete = async () => {
    setShow(false);
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${addressUrl}${data.addressId}`, options);
      if (response.ok) {
        setAddressState((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box margin=".5rem">
      {editAddress ? (<AddressForm heading="Edit" mode="edit" setShowAddressForm={setEditAddress} data={{ ...data }} setAddressState={setAddressState} />)
        : (
          <Box p={2} border={profile ? 'solid 1px gray' : 'none'}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Typography
                variant="subtitle1"
                sx={{
                  backgroundColor: 'gray',
                  width: 'fit-content',
                  padding: '4px',
                  color: 'ghostwhite',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                {data.addressType}
              </Typography>
              <Box position="relative">
                <IconButton onClick={handleClick} ref={ref}>
                  <MoreVertIcon />
                </IconButton>
                {show && (
                <Box display="flex" flexDirection="column" bgcolor="ghostwhite" borderRadius={1} boxShadow={2} zIndex="999" position="absolute" right="0">
                  <Button color="inherit" disableTouchRipple size="small" onClick={handleEdit}>Edit</Button>
                  <Button color="inherit" disableTouchRipple size="small" onClick={handleDelete}>Delete</Button>
                </Box>
                )}
              </Box>
            </Box>
            <Typography sx={{ fontWeight: '500' }}>
              {data.customerName}
              {' '}
              {data.phoneNumber}
            </Typography>
            <Typography>
              { `${data.streetAddress},${data.city},${data.stateProvince},${data.country}-${data.postalCode}`}
            </Typography>
          </Box>
        )}
    </Box>
  );
}
