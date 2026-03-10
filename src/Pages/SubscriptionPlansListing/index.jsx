import React from 'react'
import SubscriptionPlans from '../Home/SubscriptionPlans'
import { UserLayout } from '../../Components/Layout'
import "./index.css"

const SubscriptionPlansListing = () => {
    return (
        <UserLayout>
            <div className='plans-subscriptions'>
                <SubscriptionPlans showViewAll={false} />
            </div>
        </UserLayout>
    )
}

export default SubscriptionPlansListing