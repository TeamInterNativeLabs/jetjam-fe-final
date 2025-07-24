import React from 'react'
import './index.css'
import SubscriptionCard from './SubscriptionCard'
import { subscriptionPlans } from '../../../../Config/Data'

const SubscriptionPlans = () => {
  return (
    <section className="subscription-plan pb-sm-5 pb-4">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-11 col-12">
                    <div className="row">
                        {subscriptionPlans.map(item=>(
                            <div className="col-lg-4 my-3" key={item.id}>
                                <SubscriptionCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SubscriptionPlans