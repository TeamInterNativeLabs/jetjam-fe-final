import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { UserLayout } from '../../Components/Layout'
import Loader from '../../Components/Loader'
import { useGetPackagesQuery, useSubscribeMutation } from '../../Redux/Services/Packages'
import SubscriptionCard from '../Home/SubscriptionPlans/SubscriptionCard'
import { toast } from 'react-toastify'
import { SiteModal } from '../../Components/SiteModal'
import { formatDate } from '../../Utils/helper'
import './index.css'

const SubscriptionPlan = () => {

    const { id } = useParams();
    const { data, isLoading } = useGetPackagesQuery({ id, search: "" }, { refetchOnFocus: true })
    const [subscribe, { data: subscribe_data, isLoading: isSubscribing, isSuccess, isError, error }] = useSubscribeMutation()
    const [showDeferredModal, setShowDeferredModal] = useState(false)
    const [deferredUntil, setDeferredUntil] = useState(null)

    useEffect(() => {
        if (isSuccess && subscribe_data?.data?.link) {
            if (subscribe_data.data.isDeferred) {
                // Show confirmation modal before redirecting to PayPal
                setDeferredUntil(subscribe_data.data.deferredUntil)
                setShowDeferredModal(true)
            } else {
                window.location.href = subscribe_data.data.link
            }
        } else if (isSuccess && !subscribe_data?.data?.link) {
            toast.error('PayPal did not return a payment link. Please try again.')
        }
    }, [isSuccess, subscribe_data])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Subscription failed. Please try again.')
        }
    }, [isError, error])

    const onPay = useCallback(() => {
        subscribe(data.data._id)
    }, [data])

    const onConfirmDeferred = () => {
        setShowDeferredModal(false)
        window.location.href = subscribe_data.data.link
    }

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

            {/* Deferred subscription confirmation modal */}
            <SiteModal
                show={showDeferredModal}
                handleClose={() => setShowDeferredModal(false)}
                normalModal
                noCloseBtn={false}
                modalTitle="No charge until your current plan expires"
                modalText={`You still have access until ${deferredUntil ? formatDate(deferredUntil) : 'your billing period ends'}. Your new subscription will activate on that date and auto-renew monthly from then — you will not be charged today.`}
            >
                <div className="d-flex gap-3 justify-content-center mt-3">
                    <button className="site-btn" onClick={onConfirmDeferred}>
                        Confirm &amp; Continue to PayPal
                    </button>
                    <button className="site-btn orange-btn" onClick={() => setShowDeferredModal(false)}>
                        Cancel
                    </button>
                </div>
            </SiteModal>
        </UserLayout>
    )
}

export default SubscriptionPlan
