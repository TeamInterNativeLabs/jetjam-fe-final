import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserLayout } from '../../Components/Layout'
import Loader from '../../Components/Loader'
import { useGetPackagesQuery, useSubscribeMutation } from '../../Redux/Services/Packages'
import SubscriptionCard from '../Home/SubscriptionPlans/SubscriptionCard'
import { toast } from 'react-toastify'
import './index.css'

const SubscriptionPlan = () => {

    const { id } = useParams();
    const { data, isLoading } = useGetPackagesQuery({ id, search: "sadas" }, { refetchOnFocus: true })
    const [subscribe, { data: subscribe_data, isLoading: isSubscribing, isSuccess, isError, error }] = useSubscribeMutation()

    useEffect(() => {
        if (isSuccess && subscribe_data?.data?.link) {
            window.location.href = subscribe_data.data.link;
        } else if (isSuccess && !subscribe_data?.data?.link) {
            toast.error('PayPal did not return a payment link. Please try again.');
            console.error('Subscribe response missing link:', subscribe_data);
        }
    }, [isSuccess, subscribe_data])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Subscription failed. Please try again.');
        }
    }, [isError, error])

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