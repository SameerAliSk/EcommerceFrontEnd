import React from 'react';
import { Typography } from '@mui/material';
import './Footer.css';

export default function Footer() {
  const style = { color: 'gray', fontWeight: '500', margin: '5px 0px' };

  return (
    <div className="footer">
      <div className="footer-details">
        <ul className="footer-links">
          <Typography variant="body1" className="list-heading" sx={style}>About</Typography>
          <li><a className="link" href="/hi">Contact us</a></li>
          <li><a className="link" href="/hi">About us</a></li>
          <li><a className="link" href="/hi">Careers</a></li>
          <li><a className="link" href="/hi">Stories</a></li>
          <li><a className="link" href="/hi">Information</a></li>
        </ul>
        <ul className="footer-links">
          <Typography variant="body1" className="list-heading" sx={style}>Help</Typography>
          <li><a className="link" href="/hi">Payment</a></li>
          <li><a className="link" href="/hi">Shipping</a></li>
          <li><a className="link" href="/hi">Faq</a></li>
          <li><a className="link" href="/hi">Cancellation & returns</a></li>
        </ul>
        <ul className="footer-links">
          <Typography variant="body1" className="list-heading" sx={style}>Consumer Policy</Typography>
          <li><a className="link" href="/hi">Cancellation & returns</a></li>
          <li><a className="link" href="/hi">Terms of use</a></li>
          <li><a className="link" href="/hi">Security</a></li>
          <li><a className="link" href="/hi">Privacy</a></li>
          <li><a className="link" href="/hi">Grievance Redressal</a></li>
        </ul>
        <ul className="footer-links">
          <Typography variant="body1" className="list-heading" sx={style}>Social</Typography>
          <li><a className="link" href="/hi">Facebook</a></li>
          <li><a className="link" href="/hi">Youtube</a></li>
          <li><a className="link" href="/hi">Twitter</a></li>
          <li><a className="link" href="/hi">Instagram</a></li>
        </ul>
      </div>
      <div className="footer-helpcenter">
        <a className="link" href="/hi">Help Center</a>
        <a className="link" href="/hi">Become a Seller</a>
        <a className="link" href="/hi">Advertise</a>
        <a className="link" href="/hi">Gift Card</a>
        <div>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'ghostwhite',
              fontSize: '.8rem',
              fontWeight: '600',
              cursor: 'default',
            }}
          >
            ©since 2023,E-commerce.com
          </Typography>
        </div>
      </div>
    </div>
  );
}
