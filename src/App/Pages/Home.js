import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Categories } from '../Components/Header/Categories';
import ImageCarousel from '../Components/Header/ImageCarousel';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import { samsungMobilesUrl, appleMobilesUrl, mobilesFilterUrl } from '../Environment/URL';

export default function Home() {
  const [samsungMobiles, setSamsungMobiles] = useState([]);
  const [appleMobiles, setAppleMobiles] = useState([]);
  const [budgetMobiles, setBudgetMobiles] = useState([]);
  const [premiumMobiles, setPremiumMobiles] = useState([]);

  const getMobiles = async (url, setter) => {
    try {
      const options = {
        method: 'GET',
      };

      const response = await fetch(url, options);
      const responseJson = await response.json();
      setter(responseJson.filteredProductItems);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMobiles(samsungMobilesUrl, setSamsungMobiles);
    getMobiles(appleMobilesUrl, setAppleMobiles);
    getMobiles(`${mobilesFilterUrl}?MaxPrice=30000`, setBudgetMobiles);
    getMobiles(`${mobilesFilterUrl}?MinPrice=50000`, setPremiumMobiles);
  }, []);

  return (
    <div>
      <Header home />
      <Categories images />
      <ImageCarousel />
      <Cards mobileData={samsungMobiles} title="Samsung" />
      <Cards mobileData={appleMobiles} title="Apple" />
      <Cards mobileData={budgetMobiles} title="Budget" />
      <Cards mobileData={premiumMobiles} title="Premium" />
      <Footer />
    </div>
  );
}
