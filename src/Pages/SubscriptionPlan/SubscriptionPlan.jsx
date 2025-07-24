import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserLayout } from '../../Components/Layout'
import Loader from '../../Components/Loader'
import { useGetPackagesQuery, useSubscribeMutation } from '../../Redux/Services/Packages'
import SubscriptionCard from '../Home/SubscriptionPlans/SubscriptionCard'
import './index.css'

const SubscriptionPlan = () => {

    const { id } = useParams();
    const { data, isLoading } = useGetPackagesQuery({ id, search: "sadas" }, { refetchOnFocus: true })
    const [subscribe, { data: subscribe_data, isLoading: isSubscribing, isSuccess }] = useSubscribeMutation()

    useEffect(() => {
        if (isSuccess) {
            window.open(subscribe_data?.data?.link, "_blank")
        }
    }, [isSuccess])

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