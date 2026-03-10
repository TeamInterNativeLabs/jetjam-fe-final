import React, { useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { UserLayout } from '../../Components/Layout'
import Loader from '../../Components/Loader'
import { useGetPackagesQuery, useSubscribeMutation } from '../../Redux/Services/Packages'
import { useGetProfileQuery } from '../../Redux/Services/User'
import SubscriptionCard from '../Home/SubscriptionPlans/SubscriptionCard'
import './index.css'

const SubscriptionPlan = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetPackagesQuery({ id, search: "sadas" }, { refetchOnFocus: true })
    const [subscribe, { data: subscribe_data, isLoading: isSubscribing, isSuccess }] = useSubscribeMutation()
    const { refetch: refetchProfile } = useGetProfileQuery(undefined, { refetchOnFocus: true });

    useEffect(() => {
        if (isSuccess && subscribe_data?.data?.link) {
            // Open payment link
            window.open(subscribe_data?.data?.link, "_blank")
            
            // Add window focus listener to refresh data when user returns
            const handleWindowFocus = () => {
                refetchProfile();
                // Navigate to subscription logs after a short delay
                setTimeout(() => {
                    navigate('/subscription-logs');
                }, 1000);
            };
            
            // Listen for window focus (when user returns from payment)
            window.addEventListener('focus', handleWindowFocus);
            
            // Clean up listener after 5 minutes
            const cleanup = setTimeout(() => {
                window.removeEventListener('focus', handleWindowFocus);
            }, 300000);
            
            return () => {
                window.removeEventListener('focus', handleWindowFocus);
                clearTimeout(cleanup);
            };
        }
    }, [isSuccess, subscribe_data, refetchProfile, navigate])

    const onPay = useCallback(() => {
        subscribe(data.data._id)
    }, [data])

    return (
        <UserLayout>
            <section className="beat-mixed-set">
                <Loader loading={isLoading || isSubscribing} />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <div className="subscription-card-wrapper">
                                <SubscriptionCard subscriptionPage data={data?.data} onPay={onPay} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}

export default SubscriptionPlan