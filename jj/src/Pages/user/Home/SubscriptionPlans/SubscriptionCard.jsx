import React from 'react'
import SiteButton from '../../../../Components/Button/button'

const SubscriptionCard = ({title, price, duration, features}) => {
  return (
    <div className="subscription-card h-100 d-flex flex-column align-items-start">
        <h5 className="gradient-text">{title}</h5>
        <div className="d-flex align-items-center gap-1 mt-3">
            <h2 className='mb-0'>${price}</h2>
            <p className="mb-0 mt-3">/per {duration}</p>
        </div>
        <ul className="features-list mb-4 mt-2">
            {features?.map(ele=>(
                <li className='mt-3' key={ele.id}>{ele.feature}</li>
            ))}
        </ul>
        <SiteButton style={{justifySelf:'end'}}>Current Plan</SiteButton>
    </div>
  )
}

export default SubscriptionCard