import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useConfirmSubscriptionMutation } from '../../Redux/Services/Subscription';

// PayPal redirects here after approval with ?subscription_id=I-XXXX&ba_token=...
const SubscriptionConfirm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [confirmSubscription, { isLoading, isSuccess, isError, error }] = useConfirmSubscriptionMutation();
    const called = useRef(false);

    useEffect(() => {
        const subscriptionId = searchParams.get('subscription_id');
        if (!subscriptionId || called.current) return;
        called.current = true;
        confirmSubscription(subscriptionId);
    }, [searchParams, confirmSubscription]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => navigate('/subscription-logs'), 1500);
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            setTimeout(() => navigate('/subscription-logs'), 3000);
        }
    }, [isError, navigate]);

    return (
        <UserLayout>
            <Loader loading={isLoading} />
            <section className="beat-mixed-set">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8 col-12 text-center mt-5">
                            {isLoading && <p>Confirming your subscription…</p>}
                            {isSuccess && <p className="text-success">Subscription confirmed! Redirecting…</p>}
                            {isError && (
                                <p className="text-danger">
                                    {error?.data?.message || 'Could not confirm subscription. Redirecting…'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default SubscriptionConfirm;
