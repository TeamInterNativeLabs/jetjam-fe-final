import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import SiteButton from '../../../Components/Button/button';

const SubscriptionCard = ({ data, subscriptionPage, onPay }) => {

  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  const handlePurchaseClick = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }
    // If logged in, proceed to subscription page
    navigate(`/subscription-plan/${data._id}`);
  };

  if (data) {
    return (
      <div className="subscription-card h-100 d-flex flex-column align-items-start justify-content-between">
        <h5 className="gradient-text">{data.title}</h5>
        <div className="d-flex align-items-center gap-1 mt-3">
          <h2 className='mb-0'>${data.price}</h2>
          <p className="mb-0 mt-3">/per {data.duration}</p>
        </div>
        <ul className="features-list mb-4 mt-2">
          {data?.features?.map(ele => (
            <li className='mt-3' key={ele}>{ele}</li>
          ))}
        </ul>
        {subscriptionPage ? (
          <SiteButton onClick={onPay} className="w-100 mt-4" style={{ justifySelf: 'end' }}>Purchase</SiteButton>
        ) : (
          <SiteButton onClick={handlePurchaseClick} className="w-100 mt-4" style={{ justifySelf: 'end' }}>Purchase</SiteButton>
        )}
        <div id="paypal-button-container"></div>
      </div>
    )
  }

  return null

}

export default SubscriptionCard