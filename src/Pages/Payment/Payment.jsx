import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import { SiteModal } from '../../Components/SiteModal';
import { subscriptionPlans } from '../../Config/Data';
import { check } from '../../assets';

const Payment = () => {
    const [eyeIcon, seteyeIcon] = useState(faEyeSlash);
    const [passwordType, setPasswordType] = useState(0)
    const toggleIcon = () => {
        if (eyeIcon == faEyeSlash) {
            seteyeIcon(faEye)
            setPasswordType(1);
        }
        else {
            seteyeIcon(faEyeSlash);
            setPasswordType(0);
        }
    }

    const [eyeIcon2, seteyeIcon2] = useState(faEyeSlash);
    const [passwordType2, setPasswordType2] = useState(0)
    const toggleIcon2 = () => {
        if (eyeIcon2 == faEyeSlash) {
            seteyeIcon2(faEye)
            setPasswordType2(1);
        }
        else {
            seteyeIcon2(faEyeSlash);
            setPasswordType2(0);
        }
    }

    const [formData, setFormData] = useState({
        firstName: "",
        lasstName: "",
        contact: "",
        email: "",
        cvv: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentDetails, setCurrentDetails] = useState({});
    useEffect(() => {
        let currentEntry = subscriptionPlans.find(e => e.id == id)
        setCurrentDetails(currentEntry)
    }, []);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate('/')
    }
    return (
        <UserLayout>
            <section className="auth-bg">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4 className="mt-3">Payment</h4>
                            <div className="auth-card">
                                <div className="auth-card-inner">
                                    <h5 className="gradient-text">{currentDetails?.title}</h5>
                                    <div className="d-flex align-items-center gap-1 mt-3">
                                        <h2 className='mb-0'>${currentDetails?.price}</h2>
                                        <p className="mb-0 mt-3">/per {currentDetails?.duration}</p>
                                    </div>
                                    <Form>
                                        <div className="mt-3">
                                            <SiteInput
                                                label="Card Holder Name"
                                                className="p-sm"
                                                onChange={(event) => { setFormData({ ...formData, firstName: event.target.value }); }}
                                                requiredStar placeholder="Enter Card Holder Name"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <SiteInput
                                                label="Card Number"
                                                className="p-sm"
                                                onChange={(event) => { setFormData({ ...formData, lastName: event.target.value }); }}
                                                requiredStar placeholder="Enter Card Number"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <SiteInput
                                                label="Expiration Date"
                                                className="p-sm"
                                                type="month"
                                                onChange={(event) => { setFormData({ ...formData, contact: event.target.value }); }}
                                                requiredStar placeholder="Enter Expiration Date"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <SiteInput
                                                label="CVV Code"
                                                className="p-sm"
                                                type="number"
                                                onChange={(event) => { setFormData({ ...formData, cvv: event.target.value }); }}
                                                requiredStar placeholder="Enter CVV Code"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <SiteButton className="w-100 filled-btn rounded" type="button" onClick={handleShow}>Send</SiteButton>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SiteModal
                show={show}
                handleClose={handleClose}
                noCloseBtn
                modalImg={check}
                modalTitle="Subscription successful!"
                modalText={'Welcome to JetJams, You now have access.'}
                normalModal
            />
        </UserLayout>
    )
}

export default Payment