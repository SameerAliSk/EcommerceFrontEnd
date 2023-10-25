/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie';
import {
  Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, CircularProgress,
} from '@mui/material';
import AddressForm from './AddressForm';
import DisplayAddress from './DisplayAddress';
import { addressUrl } from '../../Environment/URL';

export default function Address(props) {
  const { profile, setDeliveryAddress, setSelected } = props;
  const jwtToken = Cookies.get('jwtToken');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [availableAddresses, setAvailableAddesses] = useState([]);
  const [addressState, setAddressState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState();
  const customerId = localStorage.getItem('customerId');

  useEffect(() => async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${addressUrl}${customerId}`, options);
      if (response.status === 200) {
        const responseJson = await response.json();
        setAvailableAddesses(responseJson);
        setDefaultAddress(responseJson[0].addressId);
      }
      if (response.status === 204) setAvailableAddesses([]);
    } catch (err) {
      console.log(err);
    }
  }, [addressState]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setDefaultAddress(value);
  };

  const settingDeliveryAddress = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${addressUrl}SetDefault/${defaultAddress}`, options);
      if (response.status === 200) {
        const addressForString = availableAddresses.filter((e) => e.addressId === defaultAddress);
        const addressAsString = `${addressForString[0].customerName}\n${addressForString[0].streetAddress},${addressForString[0].city},${addressForString[0].stateProvince},${addressForString[0].country}-${addressForString[0].postalCode}`;
        setDeliveryAddress(addressAsString);
        setSelected(3);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      {profile && <Typography variant="h5">Address</Typography>}
      {showAddressForm
        ? <AddressForm setShowAddressForm={setShowAddressForm} heading="Add New" mode="new" setAddressState={setAddressState} />
        : (
          <Button
            type="button"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowAddressForm(true)}
          >
            Add new address
          </Button>
        )}
      {/* {availableAddresses.length > 0 ? (<DisplayAddress data={availableAddresses[0]}
         setAddressState={setAddressState} />) : ''} */}

      {profile && availableAddresses.length > 0
      && (availableAddresses.map((data) => (
        <DisplayAddress data={data} setAddressState={setAddressState} profile key={data.addressId} />))) }

      {!profile && availableAddresses.length > 0
      && (
      <FormControl>
        <RadioGroup
          name="address"
          value={defaultAddress}
          onChange={handleChange}
        >
          {availableAddresses.map((data) => (
            <FormControlLabel
              value={data.addressId}
              control={<Radio />}
              key={data.addressId}
              label={(
                <>
                  <DisplayAddress data={data} setAddressState={setAddressState} />
                  {defaultAddress === data.addressId
                  && (
                  <button type="button" className="orange-button" disabled={loading} onClick={settingDeliveryAddress}>
                    DELIVER HERE
                    {' '}
                    {loading && <CircularProgress />}
                  </button>
                  )}
                </>
              )}
            />
          ))}
        </RadioGroup>
      </FormControl>
      )}
    </Box>
  );
}

// <Box display="flex" flexDirection="row">
// <input type="radio" id={data.addressId} value={data.addressId} name="address" onChange={handleChange} />
// <label htmlFor={data.addressId}></label>
// </Box>
