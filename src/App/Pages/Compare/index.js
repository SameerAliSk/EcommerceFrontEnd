/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { Categories } from '../../Components/Header/Categories';
import Footer from '../../Components/Footer';
import CompareImageCard from '../../Components/CompareImageCard';
import SpecificationsCard from '../../Components/SpecificationsCard';
import { getProductUrl } from '../../Environment/URL';
import './index.css';

function Compare() {
  const compareProducts = JSON.parse(localStorage.getItem('compare'));
  // const productItemIdFirst = 'A117DC1F-4B2F-4194-962E-1A2C2AB38CCF';
  // const productItemIdSecond = 'D24B070A-03AB-49A6-AB8F-E924BF1CD1A2';

  const productItemIdFirst = compareProducts[0].id;
  const productItemIdSecond = compareProducts[1].id;

  const [firstProduct, setFirstProduct] = useState({});
  const [secondProduct, setSecondProduct] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const GetProductItemData = async (productItemId, id) => {
    try {
      const url = `${getProductUrl}${productItemId}`;
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem(productItemId, JSON.stringify(responseData));
        id === 1 ? setFirstProduct(responseData) : setSecondProduct(responseData);
      } else {
        setErrorMsg('Unable to fetch the data');
      }
    } catch (err) {
      console.log(err);
      setErrorMsg('Something went wrong. Try again after some time');
    }
  };

  useEffect(() => {
    GetProductItemData(productItemIdFirst, 1);
    GetProductItemData(productItemIdSecond, 2);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header />
      <Categories />
      <div className="compare-page">
        <div className="compare-product-image-section">
          {Object.keys(firstProduct).length > 0 && <CompareImageCard {...firstProduct} />}
          {Object.keys(secondProduct).length > 0 && <CompareImageCard {...secondProduct} />}
        </div>
        <div className="compare-section">
          <div className="compare-section-heading">Specifications</div>
          <div className="compare-specifications">
            {Object.keys(firstProduct).length > 0 && <SpecificationsCard {...firstProduct} />}
            {Object.keys(secondProduct).length > 0 && <SpecificationsCard {...secondProduct} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Compare;
