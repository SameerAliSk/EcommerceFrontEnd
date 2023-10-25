/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import {
  FormControlLabel, Checkbox, Button, Typography,
  CircularProgress, Box, Select, FormControl, InputLabel,
} from '@mui/material';
import {
  Sidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import './Sidebar.css';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SideBar(props) {
  const availableFilters = JSON.parse(localStorage.getItem('filters'));
  const availablePrice = JSON.parse(localStorage.getItem('price'));
  const { brands, properties, filter } = props;
  const [price, setPrice] = useState(filter && availablePrice ? availablePrice : { MinPrice: '', MaxPrice: '' });
  const [toggled, setToggled] = useState(false);
  const [filters, setFilters] = useState(filter && availableFilters ? availableFilters : []);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const minprice = [10000, 15000, 20000, 25000];
  const maxprice = [...minprice.filter((e) => e > price.MinPrice), 30000];

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setFilters([...filters, name]);
    } else if (filters.length === 1) {
      setFilters([]);
    } else {
      setFilters(filters.filter((element) => element !== name));
    }
  };

  const changePrice = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('price', JSON.stringify(price));
    const filterQuery = filters?.join('&');
    const priceQuery = `&${price.MinPrice.length !== 0 ? price.MinPrice : ''}&${price.MaxPrice.lenght !== 0 ? price.MaxPrice : ''}`;
    navigate(`/mobiles/filter?${filterQuery}${priceQuery.length > 2 ? priceQuery : ''}`);
  };

  return (
    <div className="side-bar">
      <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="768px" backgroundColor="rgb(249, 249, 249)">
        <Box height="80vh" overflow="auto">
          <Menu>
            <Typography variant="h5" textAlign="center">Filters</Typography>
            <Box padding="0 1.5rem">
              <Typography variant="subtitle1" marginBottom="1rem">Price</Typography>
              <Box display="flex" justifyContent="space-between">
                <FormControl fullWidth>
                  <InputLabel>Min</InputLabel>
                  <Select label="min" value={price.MinPrice} variant="standard" name="MinPrice" onChange={changePrice}>
                    {minprice.map((i) => (<MenuItem value={`MinPrice=${i}`} key={i}>₹{i}</MenuItem>))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Max</InputLabel>
                  <Select label="max" value={price.MaxPrice} variant="standard" name="MaxPrice" onChange={changePrice}>
                    {maxprice.map((i) => (<MenuItem value={`MaxPrice=${i}`} key={i}>₹{i}</MenuItem>))}
                    <MenuItem value="">₹30000+</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <SubMenu label="Brands">
              {brands ? brands?.map((brand, index) => (
                <MenuItem key={index}>
                  <FormControlLabel
                    control={<Checkbox size="small" onChange={handleChange} />}
                    label={brand.brandName}
                    name={`Brands=${brand.brandId}`}
                    checked={filters.includes(`Brands=${brand.brandId}`)}
                  />
                </MenuItem>
              )) : <CircularProgress />}
            </SubMenu>
            {properties && properties.map((property) => (
              <SubMenu label={property.propertyName.replace(/_/g, ' ')} key={property.propertyId}>
                {property.propertyValues.map((ele) => (
                  <MenuItem key={ele.propertyValueId}>
                    <FormControlLabel
                      control={<Checkbox size="small" onChange={handleChange} />}
                      label={ele.propertyValue}
                      name={`${property.propertyName}=${ele.propertyValue}`}
                      checked={filters.includes(`${property.propertyName}=${ele.propertyValue}`)}
                    />
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Box>
        <Button type="button" variant="contained" size="large" fullWidth onClick={applyFilter}> Apply filter</Button>
      </Sidebar>
      {isMobile && (
        <div className="filter-button">
          <Button onClick={() => setToggled(true)} color="inherit" startIcon={<TuneOutlinedIcon />}>
            Filter
          </Button>
          {/* <Button type="button" color="inherit" size="large" onClick={applyFilter}> Apply filter</Button> */}
        </div>
      )}
    </div>
  );
}
