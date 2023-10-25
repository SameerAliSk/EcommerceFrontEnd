/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import iphone from '../Images/iphone.jpg';
import redmi from '../Images/redmi.png';
import samsung from '../Images/samsung.png';
import oneplus from '../Images/oneplus.png';
import vivo from '../Images/vivo.png';
import oppo from '../Images/oppo.jpg';

export const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

export const categoriesImg = [{
  categoryName: 'Mobiles',
  img: 'https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_640.jpg',
}, {
  categoryName: 'Fashion',
  img: 'https://cdn.pixabay.com/photo/2020/02/05/11/06/woman-4820889_640.jpg',
}, {
  categoryName: 'Appliances',
  img: 'https://cdn.pixabay.com/photo/2016/10/31/18/50/washing-machine-1786385_640.png',
}, {
  categoryName: 'Electronics',
  img: 'https://cdn.pixabay.com/photo/2015/02/05/08/06/macbook-624707_640.jpg',
}];

export const mobileBrands = [{ name: 'Redmi', logo: redmi, brandId: '6a57f13a-9162-4d62-a994-4b62fb75cccf' },
  { name: 'Oppo', logo: oppo, brandId: 'a4668a87-2793-4b5f-8e6d-77c34b92549a' },
  { name: 'Vivo', logo: vivo, brandId: '216056f2-dd65-4be4-8140-f468c87fb936' },
  { name: 'Samsung', logo: samsung, brandId: 'dc4c75e8-b1d9-4185-a58d-3062f037d405' },
  { name: 'iPhone', logo: iphone, brandId: 'ace7dfb1-09c2-4bc8-8798-54f83fa6a8eb' },
  { name: 'OnePlus', logo: oneplus, brandId: '5810639b-e4bc-43e0-a83f-aaab39bd585e' }];
