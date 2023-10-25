/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import Header from '../../Components/Header';
import { Categories } from '../../Components/Header/Categories';
import ImageCarousel from '../../Components/Header/ImageCarousel';
import SideBar from '../../Components/Sidebar';
import DetailedCards from '../../Components/DetailedCards';
import Footer from '../../Components/Footer';
import ColoredCards, { Brands } from '../../Components/ColoredCards';
import {
  getBrandsUrl, getCategoryPropertiesUrl, samsungMobilesUrl, appleMobilesUrl,
  oppoMobilesUrl, vivoMobilesUrl, redmiMobilesUrl, oneplusMobilesUrl,
} from '../../Environment/URL';

export default function Mobiles() {
  const [brands, setBrands] = useState([]);
  const [properties, setProperties] = useState([]);
  const [samsungMobiles, setSamsungMobiles] = useState([]);
  const [appleMobiles, setAppleMobiles] = useState([]);
  const [vivoMobiles, setVivoMobiles] = useState([]);
  const [oppoMobiles, setOppoMobiles] = useState([]);
  const [redmiMobiles, setRedmiMobiles] = useState([]);
  const [oneplusMobiles, setOneplusMobiles] = useState([]);

  const isMobile = useMediaQuery('(max-width:768px)');
  const [searchParams] = useSearchParams();
  const categoriesId = searchParams.get('cid');
  const style = {
    position: 'sticky', top: '86px', left: '0', zIndex: '10',
  };

  const getMobileProperties = async () => {
    try {
      const options = {
        method: 'GET',
      };

      const response = await fetch(`${getCategoryPropertiesUrl}${categoriesId}`, options);
      if (response.ok) {
        const responseJson = await response.json();
        setProperties(responseJson);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMobilesData = async (url, setter) => {
    try {
      const options = {
        method: 'GET',
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const responseJson = await response.json();
        setter(responseJson.filteredProductItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBrands = async () => {
    try {
      const options = {
        method: 'GET',
      };

      const response = await fetch(`${getBrandsUrl}${categoriesId}`, options);
      if (response.ok) {
        const responseJson = await response.json();
        setBrands(responseJson);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBrands();
    getMobileProperties();
    getMobilesData(samsungMobilesUrl, setSamsungMobiles);
    getMobilesData(redmiMobilesUrl, setRedmiMobiles);
    getMobilesData(oppoMobilesUrl, setOppoMobiles);
    getMobilesData(vivoMobilesUrl, setVivoMobiles);
    getMobilesData(oneplusMobilesUrl, setOneplusMobiles);
    getMobilesData(appleMobilesUrl, setAppleMobiles);
  }, []);

  return (
    <Box>
      <Header />
      <Categories images={false} />
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} margin="1rem 0">
        <Box sx={isMobile ? style : {
          position: 'sticky', top: '65px', zIndex: '1', height: '100%',
        }}
        >
          <SideBar brands={brands} properties={properties} />
        </Box>
        <Box width={isMobile ? '100%' : '60%'} flexGrow={1}>
          {/* <Box>
            <ImageCarousel />
          </Box> */}
          {(samsungMobiles.length > 0 && appleMobiles.length > 0 && vivoMobiles.length > 0 && oppoMobiles.length > 0 && redmiMobiles.length > 0 && oneplusMobiles.length > 0) ? (
            <Brands
              samsung={samsungMobiles}
              oppo={oppoMobiles}
              vivo={vivoMobiles}
              oneplus={oneplusMobiles}
              apple={appleMobiles}
              redmi={redmiMobiles}
            />
          ) : <Box height="40vh" textAlign="center" width="100%" padding="20%"><CircularProgress /></Box>}
          {/* {samsungMobiles.length > 0 && (
            samsungMobiles.map((data) => (
              <DetailedCards
                mobileData={data}
                key={data.productItemId}
                // compare={compare}
                // setCompare={setCompare}
              />
            ))
          )} */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
