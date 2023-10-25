import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import OrderItem from '../OrderItem';
import './index.css';

const jwtToken = Cookies.get('jwtToken');

function OrderCard(props) {
  const {
    shippingAddress, orderDate, orderStatus, orderedItems, orderId,
  } = { ...props };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCancellation = async () => {
    if (apiCallInProgress) {
      return;
    }
    try {
      setApiCallInProgress(true);
      const url = `https://localhost:7258/api/Order/Cancel/${orderId}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        window.location.reload();
      } else {
        console.log('Something went wrong unable to cancel/return the order');
        setIsModalOpen(false);
        setErrorMsg('*Something went wrong. Unable to cancel the order. Try again after sometime');
        setError(true);
      }
    } catch (err) {
      setIsModalOpen(false);
      setError(true);
      setErrorMsg('Something went wrong. Please try again after some time');
      setTimeout(() => { setError(false); setErrorMsg(''); }, 3000);
    } finally {
      setApiCallInProgress(false);
    }
  };

  const handleReturn = async () => {
    if (apiCallInProgress) {
      return;
    }
    try {
      setApiCallInProgress(true);
      const url = `https://localhost:7258/api/Order/Return/${orderId}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        window.location.reload();
      } else {
        console.log('Something went wrong unable to return the order');
        setIsModalOpen(false);
        setErrorMsg('*Something went wrong. Unable to return the order. Try again after sometime');
        setError(true);
      }
    } catch (err) {
      setIsModalOpen(false);
      setError(true);
      setErrorMsg('Something went wrong. Please try again after some time');
      setTimeout(() => { setError(false); setErrorMsg(''); }, 3000);
    } finally {
      setApiCallInProgress(false);
    }
  };

  const boxIcon = 'https://cdn-icons-png.flaticon.com/512/679/679720.png';
  return (
    <div className="order-card">
      <div>
        <div className="order-card-header">
          <div>
            <div className="order-summary">
              <img className="order-icon" src={boxIcon} alt="box-icon" />
              <h3 className="order-status">{orderStatus}</h3>
              <span className="order-detail-gray">
                Shipment -
                {' '}
                {orderedItems.length}
                {' '}
                items
              </span>
            </div>
            <div className="order-detail-gray" style={{ fontWeight: '500' }}>
              Ordered on
              {' '}
              {new Date(orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          {(orderStatus === 'Ordered' || orderStatus === 'Shipped') && <button type="button" onClick={handleModalOpen} className="return-cancel-button">CANCEL</button>}
          {orderStatus === 'Delivered' && <button type="button" onClick={handleModalOpen} className="return-cancel-button">RETURN</button>}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            contentLabel="Modal"
            style={{
              overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
              content: { maxWidth: '250px', maxHeight: '250px', margin: 'auto' },
            }}
          >
            <div className="inner-modal-container">
              <h3>
                Are you sure you want to
                {' '}
                {orderStatus === 'ordered' ? 'cancel' : 'return'}
                {' '}
                your order
              </h3>
              {(orderStatus === 'Ordered' || orderStatus === 'Shipped') && <button type="button" disabled={apiCallInProgress} className="modal-buttons modal-confirm-button" onClick={handleCancellation}>{apiCallInProgress ? 'Loading...' : 'Confirm'}</button>}
              {orderStatus === 'Delivered' && <button type="button" disabled={apiCallInProgress} className="modal-buttons modal-confirm-button" onClick={handleReturn}>{apiCallInProgress ? 'Loading...' : 'Confirm'}</button>}
              <button type="button" className="modal-buttons modal-cancel-button" onClick={handleModalClose} disabled={apiCallInProgress}>Cancel</button>
            </div>
          </Modal>
        </div>
        <p className={error ? 'error-msg display-error-msg' : 'error-msg hide-error-msg'}>{errorMsg}</p>
        <div className="shipping-details-header">
          <div className="shipping-to">
            <span style={{ fontWeight: '500' }}>Shipping to</span>
            <p className="shipping-header-paragraph">{shippingAddress.split('\n')[0]}</p>
          </div>
          <div className="shipping-address">
            <span style={{ fontWeight: '500' }}>Delivery Address</span>
            <p className="shipping-header-paragraph">{shippingAddress.split('\n')[1]}</p>
          </div>
        </div>
      </div>
      <ul className="order-items-list">
        {orderedItems.map((item) => <OrderItem key={item.orderedItemId} {...item} />)}
      </ul>
      <span>Return/Exchange window will be closed after 15 days of delivery</span>
    </div>
  );
}

export default OrderCard;
