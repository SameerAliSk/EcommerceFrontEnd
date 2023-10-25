/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  TextField, Box, FormControl, FormControlLabel, FormLabel,
  Radio, RadioGroup, Button, MenuItem, InputLabel, Select, FormHelperText, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { states } from '../../Data/data';
import { addressUrl } from '../../Environment/URL';

export default function AddressForm(props) {
  const {
    setShowAddressForm, heading, mode, setAddressState,
  } = props;
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate();
  const mobileNumberRegex = '[6-9]{1}[0-9]{9}';
  const pincodeRegex = '^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$';
  const initialValues = {
    customerName: '',
    phoneNumber: '',
    postalCode: '',
    streetAddress: '',
    city: '',
    country: 'India',
    stateProvince: '',
    addressType: '',
  };

  const handleFormSubmit = async (values, actions) => {
    const customerId = localStorage.getItem('customerId');
    const jwtToken = Cookies.get('jwtToken');
    try {
      const userAddress = { ...values, customerId };
      const editAddress = { ...values, customerId, addressId: props?.data?.addressId };
      const options = {
        method: mode === 'new' ? 'POST' : 'PUT',
        body: JSON.stringify(userAddress),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(addressUrl, options);
      const responseJson = await response.json();
      actions.resetForm();
      setShowAddressForm(false);
      setAddressState((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const userSchema = yup.object().shape({
    customerName: yup.string().required('*required'),
    phoneNumber: yup.string().required('*required').matches(mobileNumberRegex, 'enter a valid mobile number'),
    postalCode: yup.string().required('*required').matches(pincodeRegex, 'enter a valid pincode'),
    streetAddress: yup.string().required('*required'),
    stateProvince: yup.string().required('*required'),
    city: yup.string().required('*required'),
    addressType: yup.string().required('*required'),
  });

  return (
    <Box width="100%" p="2rem">
      <Typography variant="h5" sx={{ color: '#519fec' }} marginBottom={2}>{`${heading} Address`}</Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={Object.keys(props).length > 4 ? props.data : initialValues}
        validationSchema={userSchema}
      >
        {({
          values, errors, touched, handleBlur, handleChange, handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                type="text"
                label="Name"
                name="customerName"
                value={values.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerName && errors.customerName}
                helperText={touched.customerName && errors.customerName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                type="text"
                label="Mobile number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                type="text"
                label="Pincode"
                name="postalCode"
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postalCode && errors.postalCode}
                helperText={touched.postalCode && errors.postalCode}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                type="text"
                multiline
                rows={3}
                label="Address(Area and street)"
                name="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: 'span 4' }}
                error={touched.streetAddress && errors.streetAddress}
                helperText={touched.streetAddress && errors.streetAddress}
              />
              <TextField
                type="text"
                label="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: 'span 2' }}
              />
              <FormControl fullWidth sx={{ gridColumn: 'span 2' }}>
                <InputLabel
                  id="select-state"
                  error={touched.state && errors.state}
                >
                  Select your state
                </InputLabel>
                <Select
                  labelId="select-state"
                  label="Select your state"
                  name="stateProvince"
                  value={values.stateProvince}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.stateProvince && errors.stateProvince}
                >
                  {states.map((state) => (<MenuItem value={state} key={state}>{state}</MenuItem>))}
                </Select>
                <FormHelperText error={touched.stateProvince && errors.stateProvince}>
                  {touched.stateProvince && errors.stateProvince}
                </FormHelperText>
              </FormControl>
              <TextField
                type="text"
                label="Country"
                name="country"
                value={values.country}
                disabled
                error={touched.country && errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: 'span 2' }}
              />
              <FormControl>
                <FormLabel
                  id="addresstype-radio-buttons-group"
                  error={touched.addressType && errors.addressType}
                >
                  Address Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="addresstype-radio-buttons-group"
                  name="addressType"
                  value={values.addressType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.addressType && errors.addressType}
                  sx={{ gridColumn: 'span 4' }}
                >
                  <FormControlLabel value="Home" control={<Radio />} label="Home" />
                  <FormControlLabel value="Work" control={<Radio />} label="Work" />
                </RadioGroup>
                <FormHelperText error={touched.addressType && errors.addressType}>
                  {touched.addressType && errors.addressType}
                </FormHelperText>
              </FormControl>
              <Box sx={{ gridColumn: 'span 4' }}>
                <Button type="submit" variant="contained" sx={{ width: '200px' }}>Save</Button>
                <Button type="button" variant="text" sx={{ width: '200px' }} onClick={() => setShowAddressForm(false)}>Cancel</Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
